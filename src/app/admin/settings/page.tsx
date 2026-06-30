"use client";

import { useState, useEffect } from "react";

interface Config {
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
  categories: {
    slug: string;
    name: string;
  }[];
}

const defaultConfig: Config = {
  site: { name: "", tagline: "", description: "", whatsapp: "", email: "", address: "" },
  hero: { badge: "", title: "", subtitle: "", description: "", ctaText: "", ctaSecondary: "" },
  footer: { copyright: "" },
  categories: [],
};

export default function SettingsPage() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Category management state
  const [showCatForm, setShowCatForm] = useState(false);
  const [catForm, setCatForm] = useState({ name: "", slug: "" });
  const [editingCatSlug, setEditingCatSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        setConfig({
          site: { ...defaultConfig.site, ...data.site },
          hero: { ...defaultConfig.hero, ...data.hero },
          footer: { ...defaultConfig.footer, ...data.footer },
          categories: data.categories || defaultConfig.categories,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        showToast("success", "Pengaturan berhasil disimpan!");
      } else {
        showToast("error", "Gagal menyimpan pengaturan");
      }
    } catch {
      showToast("error", "Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  };

  // Category handlers
  const handleAddCategory = () => {
    if (!catForm.name.trim() || !catForm.slug.trim()) return;
    const newCat = { name: catForm.name.trim(), slug: catForm.slug.trim() };
    const exists = config.categories.some((c) => c.slug === newCat.slug && c.slug !== editingCatSlug);
    if (exists) {
      showToast("error", "Slug kategori sudah ada");
      return;
    }
    let updated: { slug: string; name: string }[];
    if (editingCatSlug) {
      updated = config.categories.map((c) => (c.slug === editingCatSlug ? newCat : c));
    } else {
      updated = [...config.categories, newCat];
    }
    setConfig({ ...config, categories: updated });
    setCatForm({ name: "", slug: "" });
    setEditingCatSlug(null);
    setShowCatForm(false);
    showToast("success", editingCatSlug ? "Kategori diperbarui" : "Kategori ditambahkan");
  };

  const handleDeleteCategory = (slug: string) => {
    if (!confirm("Hapus kategori ini?")) return;
    setConfig({
      ...config,
      categories: config.categories.filter((c) => c.slug !== slug),
    });
    showToast("success", "Kategori dihapus");
  };

  const handleEditCategory = (cat: { slug: string; name: string }) => {
    setCatForm({ name: cat.name, slug: cat.slug });
    setEditingCatSlug(cat.slug);
    setShowCatForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted";
  const labelClass = "block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium";
  const cardClass = "rounded-2xl border border-black/[0.06] bg-white p-6";

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Pengaturan Website</h1>
        <p className="text-text-secondary text-sm mt-1">Kelola informasi, hero, footer, dan kategori</p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`rounded-xl p-4 mb-6 text-sm ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Site Info */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="font-heading text-lg font-semibold mb-4">Informasi Website</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nama Website</label>
              <input
                type="text"
                value={config.site.name}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, name: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={config.site.tagline}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, tagline: e.target.value } })}
                className={inputClass}
                placeholder="e.g. Indonesia"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Deskripsi</label>
            <textarea
              value={config.site.description}
              onChange={(e) => setConfig({ ...config, site: { ...config.site, description: e.target.value } })}
              className={`${inputClass} h-24 resize-none`}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="font-heading text-lg font-semibold mb-4">Informasi Kontak</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>WhatsApp</label>
              <input
                type="text"
                value={config.site.whatsapp}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, whatsapp: e.target.value } })}
                className={inputClass}
                placeholder="6281234567890"
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={config.site.email}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, email: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Alamat</label>
              <input
                type="text"
                value={config.site.address}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, address: e.target.value } })}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="font-heading text-lg font-semibold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Badge Text</label>
              <input
                type="text"
                value={config.hero.badge}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badge: e.target.value } })}
                className={inputClass}
                placeholder="e.g. HVAC Specialist · Indonesia"
              />
            </div>
            <div>
              <label className={labelClass}>Main Title</label>
              <input
                type="text"
                value={config.hero.title}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                className={inputClass}
                placeholder="e.g. Scaling Chiller"
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                type="text"
                value={config.hero.subtitle}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
                className={inputClass}
                placeholder="e.g. & Chemical Cleaning"
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={config.hero.description}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
                className={`${inputClass} h-20 resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>CTA Button Text</label>
              <input
                type="text"
                value={config.hero.ctaText}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaText: e.target.value } })}
                className={inputClass}
                placeholder="e.g. Hubungi Kami"
              />
            </div>
            <div>
              <label className={labelClass}>Secondary CTA Text</label>
              <input
                type="text"
                value={config.hero.ctaSecondary}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaSecondary: e.target.value } })}
                className={inputClass}
                placeholder="e.g. Lihat Layanan"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="font-heading text-lg font-semibold mb-4">Footer</h2>
          <div>
            <label className={labelClass}>Copyright Text</label>
            <input
              type="text"
              value={config.footer.copyright}
              onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })}
              className={inputClass}
              placeholder="e.g. © Orikawa Indonesia. All rights reserved."
            />
          </div>
        </div>

        {/* Categories */}
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold">Kategori Postingan</h2>
            <button
              type="button"
              onClick={() => {
                setShowCatForm(!showCatForm);
                setEditingCatSlug(null);
                setCatForm({ name: "", slug: "" });
              }}
              className="btn-primary text-sm !px-4 !py-2"
            >
              {showCatForm ? "Batal" : "+ Kategori"}
            </button>
          </div>

          {/* Category Form */}
          {showCatForm && (
            <div className="rounded-xl border border-black/[0.08] bg-surface-2 p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Nama Kategori</label>
                  <input
                    type="text"
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. Tips & Trik"
                  />
                </div>
                <div>
                  <label className={labelClass}>Slug (Key)</label>
                  <input
                    type="text"
                    value={catForm.slug}
                    onChange={(e) => setCatForm({ ...catForm, slug: e.target.value.replace(/[^a-z0-9-]/g, "") })}
                    className={inputClass}
                    placeholder="e.g. tips"
                    disabled={!!editingCatSlug}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddCategory}
                className="btn-primary text-sm !px-6"
              >
                {editingCatSlug ? "Update Kategori" : "Tambah Kategori"}
              </button>
            </div>
          )}

          {/* Category List */}
          <div className="space-y-2">
            {config.categories.length === 0 ? (
              <p className="text-text-muted text-sm py-4 text-center">Belum ada kategori</p>
            ) : (
              config.categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-lg font-medium">
                      {cat.slug}
                    </span>
                    <span className="text-sm text-text-primary font-medium">{cat.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditCategory(cat)}
                      className="text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.slug)}
                      className="text-sm text-text-secondary hover:text-red-400 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="btn-primary text-sm !px-6 disabled:opacity-50">
            {saving ? "Menyimpan..." : "Simpan Semua Pengaturan"}
          </button>
        </div>
      </form>
    </div>
  );
}
