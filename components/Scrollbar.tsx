"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function Scrollbar() {
  const [progress, setProgress] =
    useState(0);

  const [visible, setVisible] =
    useState(false);

  const hideTimeout =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY;

      const docHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const scrolled =
        (scrollTop / docHeight) * 100;

      setProgress(scrolled);

      setVisible(true);

      if (hideTimeout.current)
        clearTimeout(
          hideTimeout.current
        );

      hideTimeout.current =
        setTimeout(() => {
          setVisible(false);
        }, 1200);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div
      className={`fixed top-1/2 right-6 -translate-y-1/2 h-[42vh] w-[14px]
      rounded-full z-[9999]
      transition-all duration-500
      ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
      }`}
    >
      {/* OUTER GLASS */}
      <div
        className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-full
        border border-green-400/10
        bg-white/[0.03]
        backdrop-blur-xl

        shadow-[0_0_25px_rgba(34,197,94,0.08)]
      "
      >
        {/* GRID GLOW */}
        <div
          className="
          absolute inset-0
          bg-[linear-gradient(to_bottom,transparent,rgba(34,197,94,0.08),transparent)]
          animate-pulse
        "
        />

        {/* ACTIVE ENERGY */}
        <div
          className="
          absolute bottom-0 left-0 w-full
          rounded-full

          bg-gradient-to-t
          from-green-500
          via-emerald-400
          to-green-300

          shadow-[0_0_25px_rgba(74,222,128,0.95)]
        "
          style={{
            height: `${Math.max(
              progress,
              8
            )}%`,
          }}
        >
          {/* FLOW EFFECT */}
          <div
            className="
            absolute inset-0
            opacity-70

            bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.8),transparent)]

            animate-[pulse_1.2s_linear_infinite]
          "
          />
        </div>

        {/* CORE LINE */}
        <div
          className="
          absolute left-1/2 top-0
          -translate-x-1/2

          h-full
          w-[1px]

          bg-green-300/20
        "
        />
      </div>
    </div>
  );
}