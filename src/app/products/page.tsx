"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setProducts);
  }, []);

  const categories: any = { descaler: "Descaler", rust_remover: "Rust Remover", cleaning_agent: "Cleaning Agent", inhibitor: "Inhibitor" };
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Produk</p>
          <h1 className="reveal font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Chemical{" "}
            <span className="text-text-secondary font-light">Berkualitas</span>
          </h1>
          <p className="reveal text-text-secondary text-lg max-w-2xl">
            Bahan kimia premium untuk pembersihan kerak dan karat pada sistem pendingin industri.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-3 flex-wrap reveal">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-accent text-white"
                  : "border border-black/[0.08] text-text-secondary hover:border-black/[0.15] hover:text-text-primary"
              }`}
            >
              Semua
            </button>
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  filter === key
                    ? "bg-accent text-white"
                    : "border border-black/[0.08] text-text-secondary hover:border-black/[0.15] hover:text-text-primary"
                }`}
              >
                {label as string}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">Produk akan segera tersedia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filtered.map((product) => (
                <div key={product.id} className="reveal group rounded-2xl border border-black/[0.06] bg-surface-1 overflow-hidden hover:border-black/[0.12] transition-all duration-300">
                  {product.image && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-1/80 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block text-xs text-accent font-medium tracking-wide uppercase mb-2">
                      {categories[product.category] || product.category}
                    </span>
                    <h3 className="font-heading text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xl font-bold text-accent">
                        Rp {(product.price || 0).toLocaleString("id-ID")}
                      </span>
                      <Link
                        href="/contact"
                        className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1 group/link"
                      >
                        Pesan
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
