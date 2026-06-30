"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setLoading(false), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${exiting ? "exiting" : ""}`}>
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary">
          ORI<span className="text-accent">KAWA</span>
        </h1>
        <p className="text-xs tracking-[0.3em] text-text-secondary mt-2 uppercase">
          Indonesia
        </p>
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
    </div>
  );
}
