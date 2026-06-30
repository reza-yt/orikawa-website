"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, products: 0, projects: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ]).then(([posts, products, projects]) => {
      setStats({
        posts: posts.length,
        products: products.length,
        projects: projects.length,
      });
    });
  }, []);

  const cards = [
    {
      label: "Postingan",
      value: stats.posts,
      color: "accent",
      href: "/admin/posts",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
        </svg>
      ),
    },
    {
      label: "Produk",
      value: stats.products,
      color: "warm",
      href: "/admin/products",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      label: "Project",
      value: stats.projects,
      color: "purple",
      href: "/admin/projects",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      ),
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    accent: { bg: "bg-accent/10", text: "text-accent", glow: "bg-accent/5" },
    warm: { bg: "bg-warm/10", text: "text-warm", glow: "bg-warm/5" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "bg-purple-500/5" },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Selamat datang di panel admin Orikawa</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => {
          const c = colorMap[card.color];
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface-1 p-6 hover:border-white/[0.12] transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${c.glow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.text}`}>
                    {card.icon}
                  </div>
                  <span className="text-text-muted text-xs group-hover:text-accent transition-colors flex items-center gap-1">
                    Kelola <span>→</span>
                  </span>
                </div>
                <p className="text-text-secondary text-sm">{card.label}</p>
                <p className={`font-heading text-3xl font-bold ${c.text} mt-1`}>{card.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
        <h2 className="font-heading font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/posts?new=1", label: "+ Postingan Baru", color: "btn-primary" },
            { href: "/admin/products?new=1", label: "+ Produk Baru", color: "btn-outline" },
            { href: "/admin/projects?new=1", label: "+ Project Baru", color: "btn-outline" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.color} text-sm !px-5 !py-2.5`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
