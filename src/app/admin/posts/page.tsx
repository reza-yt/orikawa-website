"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", image: "", category: "info" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts").then((r) => r.json()).then(setPosts);
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
      setForm({ title: "", content: "", image: "", category: "info" });
      setShowForm(false);
      setEditingId(null);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Postingan</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", content: "", image: "", category: "info" }); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Postingan Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "Tambah"} Postingan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Judul</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="info">Informasi</option>
                <option value="tips">Tips & Trik</option>
                <option value="news">Berita</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Konten</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg h-32"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Gambar</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded" />}
          </div>
          <div className="mt-4 flex space-x-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editingId ? "Update" : "Simpan"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4">
                  {post.image ? <img src={post.image} alt="" className="w-16 h-16 object-cover rounded" /> : "-"}
                </td>
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{post.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleEdit(post)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="p-6 text-center text-gray-500">Belum ada postingan</p>}
      </div>
    </div>
  );
}
