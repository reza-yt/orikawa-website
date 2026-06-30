"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "descaler", stock: "0" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setProducts);
    if (searchParams.get("new")) setShowForm(true);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseInt(form.price) || 0, stock: parseInt(form.stock) || 0 }),
    });
    if (res.ok) {
      const data = await res.json();
      if (editingId) {
        setProducts(products.map((p) => (p.id === editingId ? data : p)));
      } else {
        setProducts([...products, data]);
      }
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product: any) => {
    setForm({ name: product.name, description: product.description, price: product.price?.toString() || "", image: product.image || "", category: product.category || "descaler", stock: product.stock?.toString() || "0" });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setForm({ ...form, image: data.url });
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", image: "", category: "descaler", stock: "0" });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Kelola Produk</h1>
          <p className="text-text-secondary text-sm mt-1">{products.length} produk</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", description: "", price: "", image: "", category: "descaler", stock: "0" }); }}
          className="btn-primary text-sm !px-5 !py-2.5"
        >
          + Produk Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-black/[0.06] bg-surface-1 p-6 mb-8">
          <h2 className="font-heading font-semibold mb-5">
            {editingId ? "Edit" : "Tambah"} Produk
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Nama Produk</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" required />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                <option value="descaler">Descaler</option>
                <option value="rust_remover">Rust Remover</option>
                <option value="cleaning_agent">Cleaning Agent</option>
                <option value="inhibitor">Inhibitor</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Harga (Rp)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Stok</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors h-24 resize-none" required />
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Gambar Produk</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer" />
            {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl mt-3 border border-black/[0.06]" />}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-primary text-sm !px-6">{editingId ? "Update" : "Simpan"}</button>
            <button type="button" onClick={resetForm} className="btn-outline text-sm !px-6">Batal</button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm">Belum ada produk</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="group rounded-2xl border border-black/[0.06] bg-surface-1 overflow-hidden hover:border-black/[0.12] transition-all duration-300">
              {product.image && (
                <div className="relative h-44 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-1/60 to-transparent" />
                </div>
              )}
              <div className="p-5">
                <span className="inline-block text-[10px] text-accent font-medium tracking-wide uppercase mb-1">{product.category}</span>
                <h3 className="font-heading font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-text-secondary text-xs line-clamp-2 mb-3">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading text-sm font-bold text-accent">Rp {(product.price || 0).toLocaleString("id-ID")}</span>
                  <span className="text-text-muted text-xs">Stok: {product.stock || 0}</span>
                </div>
                <div className="flex gap-3 pt-3 border-t border-black/[0.06]">
                  <button onClick={() => handleEdit(product)} className="text-xs text-text-secondary hover:text-accent transition-colors">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-xs text-text-secondary hover:text-red-400 transition-colors">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
