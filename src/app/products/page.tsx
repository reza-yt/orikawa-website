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
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Produk Chemical</h1>
          <p className="text-xl text-green-100">Bahan kimia berkualitas untuk pembersihan kerak dan karat</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-8 flex-wrap">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-green-600 text-white" : "bg-gray-200"}`}>Semua</button>
            {Object.entries(categories).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} className={`px-4 py-2 rounded-full ${filter === key ? "bg-green-600 text-white" : "bg-gray-200"}`}>{label as string}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">Produk akan segera tersedia</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />}
                  <div className="p-6">
                    <span className="text-sm text-green-600 font-medium">{categories[product.category] || product.category}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">Rp {(product.price || 0).toLocaleString("id-ID")}</span>
                      <Link href="/contact" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                        Pesan
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
