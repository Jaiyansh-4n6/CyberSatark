import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.VIRUSTOTAL_API_KEY;

    let domain = "";
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      domain = parsed.hostname;
    } catch {
      domain = url;
    }

    if (!apiKey) {
      // Deterministic simulation mock mode based on keyword triggers
      const urlLower = url.toLowerCase();
      const isDangerous = urlLower.includes("billing") || 
                          urlLower.includes("verify") || 
                          urlLower.includes("secure") || 
                          urlLower.includes("login") || 
                          urlLower.includes("bank") || 
                          urlLower.includes("scam") ||
                          urlLower.includes("tinyurl") ||
                          urlLower.includes("bit.ly");
      
      const detections = isDangerous ? Math.floor(Math.random() * 3) + 4 : 0;
      const totalEngines = 92;

      const mockVendors = [
        { name: "Google Safe Browsing", status: isDangerous ? "suspicious" : "clean" },
        { name: "Kaspersky", status: isDangerous ? "malicious" : "clean" },
        { name: "Sophos", status: isDangerous ? "malicious" : "clean" },
        { name: "BitDefender", status: "clean" },
        { name: "Symantec", status: isDangerous ? "malicious" : "clean" },
        { name: "Fortinet", status: "clean" },
        { name: "Avast", status: "clean" },
        { name: "McAfee", status: isDangerous ? "suspicious" : "clean" },
        { name: "ESET-NOD32", status: "clean" },
        { name: "Yandex Safe Browsing", status: "clean" }
      ];

      return NextResponse.json({
        live: false,
        stats: {
          malicious: detections,
          suspicious: isDangerous ? 2 : 0,
          harmless: totalEngines - detections - (isDangerous ? 2 : 0),
          undetected: 0
        },
        reputation: isDangerous ? -15 : 50,
        categories: isDangerous ? ["Phishing", "Social Engineering"] : ["Web Hosting", "Technology"],
        vendors: mockVendors,
        url,
        domain
      });
    }

    // Call real VirusTotal API
    const urlSafeBase64 = Buffer.from(url)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const vtResponse = await fetch(`https://www.virustotal.com/api/v3/urls/${urlSafeBase64}`, {
      headers: {
        "x-apikey": apiKey
      }
    });

    if (vtResponse.status === 404) {
      // Submit scan and queue
      const scanResponse = await fetch("https://www.virustotal.com/api/v3/urls", {
        method: "POST",
        headers: {
          "x-apikey": apiKey,
          "content-type": "application/x-www-form-urlencoded"
        },
        body: `url=${encodeURIComponent(url)}`
      });

      if (!scanResponse.ok) {
        throw new Error(`Failed to queue VirusTotal scan: ${scanResponse.statusText}`);
      }

      return NextResponse.json({
        live: true,
        queued: true,
        message: "URL was not found in VirusTotal registry. Scan queued. Re-verify in 10 seconds."
      });
    }

    if (!vtResponse.ok) {
      throw new Error(`VirusTotal API error: ${vtResponse.statusText}`);
    }

    const vtData = await vtResponse.json();
    const attributes = vtData?.data?.attributes;

    if (!attributes) {
      throw new Error("Invalid response format received from VirusTotal");
    }

    const stats = attributes.last_analysis_stats || { malicious: 0, suspicious: 0, harmless: 0, undetected: 0 };
    const reputation = attributes.reputation || 0;
    const categoriesMap = attributes.categories || {};
    const categories = Object.values(categoriesMap).filter(Boolean);

    const vendorResults = attributes.last_analysis_results || {};
    const targetVendors = ["Google Safebrowsing", "Kaspersky", "Sophos", "BitDefender", "Symantec", "Fortinet", "Avast", "McAfee", "ESET-NOD32", "Yandex"];
    
    const vendors = targetVendors.map(vendor => {
      const match = Object.keys(vendorResults).find(k => k.toLowerCase().includes(vendor.toLowerCase()));
      const result = match ? vendorResults[match] : null;
      
      let cleanStatus = "clean";
      if (result) {
        if (result.category === "malicious") cleanStatus = "malicious";
        else if (result.category === "suspicious") cleanStatus = "suspicious";
      }
      
      return {
        name: vendor,
        status: cleanStatus
      };
    });

    return NextResponse.json({
      live: true,
      stats,
      reputation,
      categories,
      vendors,
      url,
      domain
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to contact VirusTotal endpoint" }, { status: 500 });
  }
}
