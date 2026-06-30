"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", client: "", location: "", date: "", images: [] as string[] });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
    if (searchParams.get("new")) setShowForm(true);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      const data = await res.json();
      if (editingId) { setProjects(projects.map((p) => (p.id === editingId ? data : p))); }
      else { setProjects([...projects, data]); }
      setForm({ title: "", description: "", client: "", location: "", date: "", images: [] });
      setShowForm(false);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus project ini?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEdit = (project: any) => {
    setForm({ title: project.title, description: project.description, client: project.client || "", location: project.location || "", date: project.date || "", images: project.images || [] });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setForm({ ...form, images: [...form.images, data.url] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Project</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", description: "", client: "", location: "", date: "", images: [] }); }} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">+ Project Baru</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "Tambah"} Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-2">Judul Project</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required /></div>
            <div><label className="block text-sm font-medium mb-2">Klien</label><input type="text" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-2">Lokasi</label><input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-2">Tanggal</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          <div className="mt-4"><label className="block text-sm font-medium mb-2">Deskripsi</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg h-24" required /></div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Foto Project</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            <div className="flex gap-2 flex-wrap">{form.images.map((img, i) => (<img key={i} src={img} alt="" className="w-24 h-24 object-cover rounded" />))}</div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">{editingId ? "Update" : "Simpan"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.client} • {project.location} • {project.date}</p>
                <p className="text-gray-600 mt-2">{project.description}</p>
                {project.images?.length > 0 && (<div className="flex gap-2 mt-3">{project.images.slice(0, 3).map((img: string, i: number) => (<img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded" />))}</div>)}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(project)} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length === 0 && <p className="text-center text-gray-500 mt-8">Belum ada project</p>}
    </div>
  );
}
