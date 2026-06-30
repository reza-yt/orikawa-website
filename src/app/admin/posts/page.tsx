"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Category {
  slug: string;
  name: string;
}

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "", category: "info" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts").then((r) => r.json()).then(setPosts);
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          setCategories([
            { slug: "info", name: "Informasi" },
            { slug: "tips", name: "Tips & Trik" },
            { slug: "news", name: "Berita" },
          ]);
        }
      })
      .catch(() =>
        setCategories([
          { slug: "info", name: "Informasi" },
          { slug: "tips", name: "Tips & Trik" },
          { slug: "news", name: "Berita" },
        ])
      );
    if (searchParams.get("new")) setShowForm(true);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      if (editingId) {
        setPosts(posts.map((p) => (p.id === editingId ? data : p)));
      } else {
        setPosts([...posts, data]);
      }
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus postingan ini?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleEdit = (post: any) => {
    setForm({ title: post.title, content: post.content, image: post.image || "", category: post.category || "info" });
    setEditingId(post.id);
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
    setForm({ title: "", content: "", image: "", category: "info" });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Kelola Postingan</h1>
          <p className="text-text-secondary text-sm mt-1">{posts.length} postingan</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", content: "", image: "", category: "info" }); }}
          className="btn-primary text-sm !px-5 !py-2.5"
        >
          + Postingan Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-black/[0.06] bg-surface-1 p-6 mb-8">
          <h2 className="font-heading font-semibold mb-5">
            {editingId ? "Edit" : "Tambah"} Postingan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Judul</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted" required />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Konten</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted h-32 resize-none" required />
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Gambar</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer" />
            {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl mt-3 border border-black/[0.06]" />}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-primary text-sm !px-6">{editingId ? "Update" : "Simpan"}</button>
            <button type="button" onClick={resetForm} className="btn-outline text-sm !px-6">Batal</button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border border-black/[0.06] bg-surface-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.06]">
                <th className="px-6 py-4 text-left text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">Gambar</th>
                <th className="px-6 py-4 text-left text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">Judul</th>
                <th className="px-6 py-4 text-left text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">Kategori</th>
                <th className="px-6 py-4 text-left text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">Tanggal</th>
                <th className="px-6 py-4 text-left text-[10px] text-text-muted tracking-[0.15em] uppercase font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="px-6 py-4">
                    {post.image ? <img src={post.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-black/[0.06]" /> : <span className="text-text-muted">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-lg font-medium">
                      {categories.find((c) => c.slug === post.category)?.name || post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {new Date(post.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(post)} className="text-sm text-text-secondary hover:text-accent transition-colors">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="text-sm text-text-secondary hover:text-red-400 transition-colors">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {posts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-text-muted text-sm">Belum ada postingan</p>
          </div>
        )}
      </div>
    </div>
  );
}
