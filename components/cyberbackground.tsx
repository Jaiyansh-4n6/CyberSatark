"use client";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0f1115]">

      {/* PRIMARY BLUE ENERGY */}
      <div
        className="
        absolute
        top-[-25%]
        left-[10%]

        h-[900px]
        w-[900px]

        rounded-full

        bg-blue-500/20

        blur-[180px]

        animate-pulse
      "
      />

      {/* CYAN SWIRL */}
      <div
        className="
        absolute
        bottom-[-20%]
        right-[5%]

        h-[700px]
        w-[700px]

        rounded-full

        bg-cyan-400/10

        blur-[150px]

        animate-pulse
      "
        style={{
          animationDuration: "8s",
        }}
      />

      {/* SWIRLING RING */}
      <div
        className="
        absolute

        left-1/2
        top-1/2

        h-[900px]
        w-[1200px]

        -translate-x-1/2
        -translate-y-1/2

        rotate-[-12deg]

        rounded-full

        border-[90px]
        border-blue-400/10

        blur-3xl
      "
      />

      {/* CENTER LIGHT */}
      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_45%)]

        pointer-events-none
      "
      />

      {/* TOP LIGHT */}
      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]

        pointer-events-none
      "
      />

      {/* SUBTLE GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* VIGNETTE */}
      <div
        className="
        absolute inset-0

        bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.75))]
      "
      />
    </div>
  );
}