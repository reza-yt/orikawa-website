"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [config, setConfig] = useState({ site: { name: "", description: "", whatsapp: "", email: "", address: "" } });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/config").then((r) => r.json()).then(setConfig);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tight">Pengaturan Website</h1>
        <p className="text-text-secondary text-sm mt-1">Kelola informasi website Anda</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6 mb-6">
          <h2 className="font-heading font-semibold mb-5">Informasi Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Nama Website</label>
              <input
                type="text"
                value={config.site.name}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, name: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Email</label>
              <input
                type="email"
                value={config.site.email}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, email: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">WhatsApp</label>
              <input
                type="text"
                value={config.site.whatsapp}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, whatsapp: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Alamat</label>
              <input
                type="text"
                value={config.site.address}
                onChange={(e) => setConfig({ ...config, site: { ...config.site, address: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Deskripsi</label>
            <textarea
              value={config.site.description}
              onChange={(e) => setConfig({ ...config, site: { ...config.site, description: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors h-24 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary text-sm !px-6">
            Simpan Pengaturan
          </button>
          {saved && (
            <span className="text-accent text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Tersimpan
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
