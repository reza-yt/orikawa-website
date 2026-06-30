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
      resetForm();
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

  const resetForm = () => {
    setForm({ title: "", description: "", client: "", location: "", date: "", images: [] });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Kelola Project</h1>
          <p className="text-text-secondary text-sm mt-1">{projects.length} project</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", description: "", client: "", location: "", date: "", images: [] }); }}
          className="btn-primary text-sm !px-5 !py-2.5"
        >
          + Project Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-black/[0.06] bg-surface-1 p-6 mb-8">
          <h2 className="font-heading font-semibold mb-5">
            {editingId ? "Edit" : "Tambah"} Project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Judul Project</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" required />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Klien</label>
              <input type="text" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Lokasi</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Tanggal</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors h-24 resize-none" required />
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Foto Project</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer" />
            {form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {form.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-lg border border-black/[0.06]" />
                ))}
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-primary text-sm !px-6">{editingId ? "Update" : "Simpan"}</button>
            <button type="button" onClick={resetForm} className="btn-outline text-sm !px-6">Batal</button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm">Belum ada project</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded-2xl border border-black/[0.06] bg-surface-1 p-6 hover:border-black/[0.12] transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold mb-1">{project.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-text-muted mb-3">
                    {project.client && <span className="flex items-center gap-1"><span className="text-accent">→</span> {project.client}</span>}
                    {project.location && <span className="flex items-center gap-1"><span className="text-accent">→</span> {project.location}</span>}
                    {project.date && <span className="flex items-center gap-1"><span className="text-accent">→</span> {project.date}</span>}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
                  {project.images?.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {project.images.slice(0, 4).map((img: string, i: number) => (
                        <img key={i} src={img} alt="" className="w-16 h-16 object-cover rounded-lg border border-black/[0.06]" />
                      ))}
                      {project.images.length > 4 && (
                        <div className="w-16 h-16 rounded-lg border border-black/[0.06] bg-surface-2 flex items-center justify-center text-text-muted text-xs">
                          +{project.images.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(project)} className="text-sm text-text-secondary hover:text-accent transition-colors">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-sm text-text-secondary hover:text-red-400 transition-colors">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
