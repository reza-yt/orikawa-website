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
      setForm({ name: "", description: "", price: "", image: "", category: "descaler", stock: "0" });
      setShowForm(false);
      setEditingId(null);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Produk</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", description: "", price: "", image: "", category: "descaler", stock: "0" }); }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Produk Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "Tambah"} Produk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Produk</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                <option value="descaler">Descaler</option>
                <option value="rust_remover">Rust Remover</option>
                <option value="cleaning_agent">Cleaning Agent</option>
                <option value="inhibitor">Inhibitor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga (Rp)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stok</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg h-24" required />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Gambar Produk</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded" />}
          </div>
          <div className="mt-4 flex space-x-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingId ? "Update" : "Simpan"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-bold">Rp {(product.price || 0).toLocaleString("id-ID")}</p>
              <p className="text-sm text-gray-500">Stok: {product.stock || 0}</p>
              <div className="mt-3 flex space-x-2">
                <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="text-center text-gray-500 mt-8">Belum ada produk</p>}
    </div>
  );
}
