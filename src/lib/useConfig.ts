"use client";

import { useState, useEffect } from "react";

export interface SiteConfig {
  admin: {
    username: string;
    password: string;
  };
  site: {
    name: string;
    tagline: string;
    description: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaSecondary: string;
  };
  footer: {
    copyright: string;
  };
  categories: Array<{
    slug: string;
    name: string;
  }>;
}

const fallbackConfig: SiteConfig = {
  admin: { username: "admin", password: "" },
  site: {
    name: "Orikawa Indonesia",
    tagline: "Indonesia",
    description: "Specialist scaling chiller & chemical cleaning untuk sistem HVAC industri di seluruh Indonesia.",
    whatsapp: "6281234567890",
    email: "info@orikawa.id",
    address: "Jakarta, Indonesia",
  },
  hero: {
    badge: "HVAC Specialist · Indonesia",
    title: "Scaling Chiller",
    subtitle: "& Chemical Cleaning",
    description: "Jasa profesional pembersihan kerak, karat, dan endapan pada sistem HVAC industri. Efisiensi optimal, harga kompetitif.",
    ctaText: "Hubungi Kami",
    ctaSecondary: "Lihat Layanan",
  },
  footer: {
    copyright: "© Orikawa Indonesia. All rights reserved.",
  },
  categories: [
    { slug: "info", name: "Informasi" },
    { slug: "tips", name: "Tips & Trik" },
    { slug: "news", name: "Berita" },
  ],
};

export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(fallbackConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        // Merge fetched config over fallback defaults
        const merged = {
          ...fallbackConfig,
          ...data,
          site: { ...fallbackConfig.site, ...(data.site || {}) },
          hero: { ...fallbackConfig.hero, ...(data.hero || {}) },
          footer: { ...fallbackConfig.footer, ...(data.footer || {}) },
        };
        setConfig(merged);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { config, loading };
}
