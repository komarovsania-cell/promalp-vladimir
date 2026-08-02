"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export default function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
  y = 30,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
