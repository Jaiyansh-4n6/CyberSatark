import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { target, type } = await request.json();
    if (!target || !type) {
      return NextResponse.json({ error: "Target and Type are required" }, { status: 400 });
    }

    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    const cleanTarget = target.trim();

    if (!apiKey) {
      // Deterministic Mock Simulation
      const lowerTarget = cleanTarget.toLowerCase();
      let isDangerous = false;
      let mockData: any = {};

      if (type === "hash") {
        // Test hashes like EICAR or custom triggers
        isDangerous = lowerTarget.includes("eicar") || 
                      lowerTarget.includes("malware") || 
                      lowerTarget === "44d88612fea8a8f36de82e1278abb02f" || 
                      lowerTarget === "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
        
        const maliciousCount = isDangerous ? 68 : 0;
        const total = 74;

        mockData = {
          entityType: "File Hash",
          targetName: isDangerous ? "Trojan.Win32.Generic.eicar" : "Clean_Asset.bin",
          stats: {
            malicious: maliciousCount,
            suspicious: isDangerous ? 2 : 0,
            harmless: total - maliciousCount - (isDangerous ? 2 : 0),
            undetected: 0
          },
          reputation: isDangerous ? -85 : 45,
          metadata: {
            size: isDangerous ? "68 bytes" : "2.4 MB",
            file_type: isDangerous ? "ASCII text" : "Win32 Executable",
            md5: isDangerous ? "44d88612fea8a8f36de82e1278abb02f" : "3c510a12e1a2f913d80a158b0f90761f",
            sha256: isDangerous ? "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f" : "d50a2b8e3c6f1a8c91a0b3f5c9e2b10a28f84019a12c8b093498aef00b91cf8e"
          },
          vendors: [
            { name: "Kaspersky", status: isDangerous ? "malicious" : "clean" },
            { name: "Sophos", status: isDangerous ? "malicious" : "clean" },
            { name: "Microsoft Defender", status: isDangerous ? "malicious" : "clean" },
            { name: "CrowdStrike", status: isDangerous ? "malicious" : "clean" },
            { name: "SentinelOne", status: isDangerous ? "malicious" : "clean" },
            { name: "Symantec", status: isDangerous ? "malicious" : "clean" },
            { name: "BitDefender", status: "clean" },
            { name: "Fortinet", status: "clean" },
            { name: "McAfee", status: isDangerous ? "malicious" : "clean" },
            { name: "Avast", status: "clean" }
          ]
        };
      } else if (type === "ip") {
        isDangerous = lowerTarget === "198.51.100.42" || 
                      lowerTarget === "203.0.113.88" || 
                      lowerTarget.includes("danger") ||
                      lowerTarget.startsWith("185.") || 
                      lowerTarget.startsWith("194.");
                      
        const maliciousCount = isDangerous ? 14 : 0;
        const total = 88;

        mockData = {
          entityType: "IP Address",
          targetName: cleanTarget,
          stats: {
            malicious: maliciousCount,
            suspicious: isDangerous ? 1 : 0,
            harmless: total - maliciousCount - (isDangerous ? 1 : 0),
            undetected: 0
          },
          reputation: isDangerous ? -32 : 18,
          metadata: {
            country: isDangerous ? "RU" : "US",
            asn: isDangerous ? "AS48098 (ProxyHost)" : "AS15169 (Google LLC)",
            network: isDangerous ? "185.122.0.0/16" : "8.8.8.0/24",
            regional_registry: "RIPE NCC"
          },
          vendors: [
            { name: "AbuseIPDB", status: isDangerous ? "malicious" : "clean" },
            { name: "Kaspersky", status: isDangerous ? "malicious" : "clean" },
            { name: "Sophos", status: "clean" },
            { name: "Spamhaus", status: isDangerous ? "malicious" : "clean" },
            { name: "Symantec", status: "clean" },
            { name: "Fortinet", status: "clean" },
            { name: "AlienVault", status: isDangerous ? "suspicious" : "clean" },
            { name: "McAfee", status: "clean" },
            { name: "Cisco Talos", status: isDangerous ? "malicious" : "clean" },
            { name: "BannedIPs", status: "clean" }
          ]
        };
      } else if (type === "domain") {
        isDangerous = lowerTarget.includes("evil") || 
                      lowerTarget.includes("phish") || 
                      lowerTarget.includes("malware") || 
                      lowerTarget.includes("update") || 
                      lowerTarget.includes("billing") || 
                      lowerTarget.includes("login");
                      
        const maliciousCount = isDangerous ? 22 : 0;
        const total = 90;

        mockData = {
          entityType: "Domain / URL",
          targetName: cleanTarget,
          stats: {
            malicious: maliciousCount,
            suspicious: isDangerous ? 2 : 0,
            harmless: total - maliciousCount - (isDangerous ? 2 : 0),
            undetected: 0
          },
          reputation: isDangerous ? -48 : 56,
          metadata: {
            registrar: isDangerous ? "NameCheap Inc." : "MarkMonitor Inc.",
            creation_date: isDangerous ? "2026-05-15" : "1997-09-15",
            dns_sec: isDangerous ? "unsigned" : "signed (verified)",
            tld_risk: isDangerous ? "High Risk" : "Low Risk"
          },
          vendors: [
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
          ]
        };
      }

      return NextResponse.json({
        live: false,
        ...mockData
      });
    }

    // Call real VirusTotal API
    let vtEndpoint = "";
    if (type === "hash") {
      vtEndpoint = `https://www.virustotal.com/api/v3/files/${cleanTarget}`;
    } else if (type === "ip") {
      vtEndpoint = `https://www.virustotal.com/api/v3/ip_addresses/${cleanTarget}`;
    } else if (type === "domain") {
      vtEndpoint = `https://www.virustotal.com/api/v3/domains/${cleanTarget}`;
    }

    const vtResponse = await fetch(vtEndpoint, {
      headers: {
        "x-apikey": apiKey
      }
    });

    if (!vtResponse.ok) {
      throw new Error(`VirusTotal API responded with status ${vtResponse.status}: ${vtResponse.statusText}`);
    }

    const vtData = await vtResponse.json();
    const attributes = vtData?.data?.attributes;

    if (!attributes) {
      throw new Error("Invalid response format received from VirusTotal");
    }

    const stats = attributes.last_analysis_stats || { malicious: 0, suspicious: 0, harmless: 0, undetected: 0 };
    const reputation = attributes.reputation || 0;

    let metadata: any = {};
    let vendorsList: string[] = [];

    if (type === "hash") {
      metadata = {
        size: `${Math.round(attributes.size / 1024)} KB`,
        file_type: attributes.type_description || "Unknown",
        md5: attributes.md5 || "",
        sha256: attributes.sha256 || ""
      };
      vendorsList = ["Kaspersky", "Sophos", "Microsoft", "CrowdStrike", "SentinelOne", "Symantec", "BitDefender", "Fortinet", "McAfee", "Avast"];
    } else if (type === "ip") {
      metadata = {
        country: attributes.country || "Unknown",
        asn: `AS${attributes.asn} (${attributes.as_owner})`,
        network: attributes.network || "Unknown",
        regional_registry: attributes.regional_internet_registry || "Unknown"
      };
      vendorsList = ["AbuseIPDB", "Kaspersky", "Sophos", "Spamhaus", "Symantec", "Fortinet", "AlienVault", "McAfee", "Cisco", "BannedIPs"];
    } else if (type === "domain") {
      metadata = {
        registrar: attributes.registrar || "Unknown",
        creation_date: attributes.creation_date ? new Date(attributes.creation_date * 1000).toISOString().split('T')[0] : "Unknown",
        dns_sec: attributes.last_dns_records ? "Active" : "Inactive",
        tld_risk: cleanTarget.endsWith(".xyz") || cleanTarget.endsWith(".tk") ? "High Risk" : "Standard Risk"
      };
      vendorsList = ["Google Safebrowsing", "Kaspersky", "Sophos", "BitDefender", "Symantec", "Fortinet", "Avast", "McAfee", "ESET-NOD32", "Yandex"];
    }

    const vendorResults = attributes.last_analysis_results || {};
    const vendors = vendorsList.map(vendorName => {
      const match = Object.keys(vendorResults).find(k => k.toLowerCase().includes(vendorName.toLowerCase()));
      const result = match ? vendorResults[match] : null;
      
      let cleanStatus = "clean";
      if (result) {
        if (result.category === "malicious") cleanStatus = "malicious";
        else if (result.category === "suspicious") cleanStatus = "suspicious";
      }
      
      return {
        name: vendorName,
        status: cleanStatus
      };
    });

    return NextResponse.json({
      live: true,
      entityType: type === "hash" ? "File Hash" : type === "ip" ? "IP Address" : "Domain",
      targetName: cleanTarget,
      stats,
      reputation,
      metadata,
      vendors
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to contact threat intelligence network" }, { status: 500 });
  }
}
