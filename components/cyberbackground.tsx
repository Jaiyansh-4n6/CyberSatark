"use client";

import { useEffect, useRef } from "react";

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Drifting constellation particles
    class Star {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;

      constructor() {
        this.reset(true);
      }

      reset(initAll = false) {
        this.x = Math.random() * canvas!.width;
        this.y = initAll ? Math.random() * canvas!.height : canvas!.height + 10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.4 + 0.15); // Drifting upwards
        this.size = Math.random() * 1.8 + 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -10 || this.x < -10 || this.x > canvas!.width + 10) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(52, 211, 153, 0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const starCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 22000));
    const stars: Star[] = Array.from({ length: starCount }, () => new Star());

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = "rgba(52, 211, 153, 0.08)";
      ctx.lineWidth = 0.85;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update stars
      stars.forEach(s => {
        s.update();
        s.draw();
      });
    }

    const loop = () => {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#02040a]">
      {/* CSS-animated dynamic waving aurora borealis */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aurora-wave-1 {
          0% { transform: translate(-5%, -5%) skew(-15deg) rotate(0deg) scaleY(0.9); opacity: 0.5; }
          33% { transform: translate(10%, -10%) skew(-22deg) rotate(6deg) scaleY(1.1); opacity: 0.8; }
          66% { transform: translate(-10%, 10%) skew(-8deg) rotate(-6deg) scaleY(0.85); opacity: 0.65; }
          100% { transform: translate(-5%, -5%) skew(-15deg) rotate(0deg) scaleY(0.9); opacity: 0.5; }
        }
        @keyframes aurora-wave-2 {
          0% { transform: translate(5%, 10%) skew(-25deg) rotate(0deg) scaleY(1.05); opacity: 0.45; }
          50% { transform: translate(-10%, -5%) skew(-14deg) rotate(-8deg) scaleY(0.9); opacity: 0.75; }
          100% { transform: translate(5%, 10%) skew(-25deg) rotate(0deg) scaleY(1.05); opacity: 0.45; }
        }
        @keyframes aurora-wave-3 {
          0% { transform: translate(-10%, 5%) skew(-8deg) rotate(0deg) scaleY(0.85); opacity: 0.4; }
          50% { transform: translate(8%, 10%) skew(-18deg) rotate(8deg) scaleY(1.1); opacity: 0.65; }
          100% { transform: translate(-10%, 5%) skew(-8deg) rotate(0deg) scaleY(0.85); opacity: 0.4; }
        }
        .aurora-sheet-1 {
          animation: aurora-wave-1 22s ease-in-out infinite;
        }
        .aurora-sheet-2 {
          animation: aurora-wave-2 26s ease-in-out infinite;
        }
        .aurora-sheet-3 {
          animation: aurora-wave-3 30s ease-in-out infinite;
        }
      `}} />

      {/* DYNAMIC SHIMMERING CYBER AURORA SHEETS */}
      <div className="absolute inset-0 pointer-events-none opacity-85 overflow-hidden">
        {/* Emerald Aurora Sheet */}
        <div className="absolute top-[-30%] left-[-20%] w-[140%] h-[90%] bg-gradient-to-tr from-transparent via-emerald-500/22 to-green-400/25 blur-[100px] aurora-sheet-1" />
        
        {/* Cyan/Teal Aurora Sheet */}
        <div className="absolute top-[-10%] left-[-10%] w-[130%] h-[80%] bg-gradient-to-bl from-transparent via-cyan-500/18 to-teal-400/22 blur-[110px] aurora-sheet-2" />
        
        {/* Cobalt Blue Aurora Sheet */}
        <div className="absolute bottom-[-20%] left-[-15%] w-[140%] h-[85%] bg-gradient-to-br from-transparent via-blue-600/16 to-indigo-500/18 blur-[120px] aurora-sheet-3" />
      </div>

      {/* Glassmorphic Diffusion Filter */}
      <div className="absolute inset-0 backdrop-blur-[35px] pointer-events-none" />

      {/* Constellation Canvas Grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50"
      />

      {/* Tech Grid Scanline Net Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Depth Vignette Mask */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,4,10,0.85)_90%)]" />
    </div>
  );
}