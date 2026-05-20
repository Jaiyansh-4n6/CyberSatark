"use client";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0f1115]">

      {/* MAIN BLUE ENERGY */}
      <div
        className="
        absolute

        top-[-20%]
        left-[15%]

        h-[900px]
        w-[900px]

        rounded-full

        bg-blue-500/20

        blur-[160px]

        animate-pulse
      "
      />

      {/* SECONDARY CYAN LIGHT */}
      <div
        className="
        absolute

        bottom-[-25%]
        right-[5%]

        h-[700px]
        w-[700px]

        rounded-full

        bg-cyan-400/10

        blur-[140px]

        animate-pulse
      "
        style={{
          animationDuration: "7s",
        }}
      />

      {/* SWIRLING LIGHT ARC */}
      <div
        className="
        absolute

        top-[15%]
        left-[30%]

        h-[600px]
        w-[900px]

        rotate-[-12deg]

        rounded-full

        border-[80px]
        border-blue-400/10

        blur-3xl
      "
      />

      {/* DARK VIGNETTE */}
      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.7))]
      "
      />

      {/* SOFT TOP LIGHT */}
      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]

        pointer-events-none
      "
      />

      {/* SUBTLE GRID */}
      <div
        className="
        absolute inset-0

        opacity-[0.04]
      "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* NOISE TEXTURE */}
      <div
        className="
        absolute inset-0

        opacity-[0.025]

        mix-blend-soft-light
      "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </div>
  );
}