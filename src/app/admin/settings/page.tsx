"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [config, setConfig] = useState({ site: { name: "", description: "", whatsapp: "", email: "", address: "" } });

  useEffect(() => {
    fetch("/api/config").then((r) => r.json()).then(setConfig);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    alert("Pengaturan disimpan!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pengaturan Website</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-2">Nama Website</label><input type="text" value={config.site.name} onChange={(e) => setConfig({ ...config, site: { ...config.site, name: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" value={config.site.email} onChange={(e) => setConfig({ ...config, site: { ...config.site, email: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-2">WhatsApp</label><input type="text" value={config.site.whatsapp} onChange={(e) => setConfig({ ...config, site: { ...config.site, whatsapp: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-2">Alamat</label><input type="text" value={config.site.address} onChange={(e) => setConfig({ ...config, site: { ...config.site, address: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" /></div>
        </div>
        <div className="mt-4"><label className="block text-sm font-medium mb-2">Deskripsi</label><textarea value={config.site.description} onChange={(e) => setConfig({ ...config, site: { ...config.site, description: e.target.value } })} className="w-full px-3 py-2 border rounded-lg h-24" /></div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Simpan Pengaturan</button>
      </form>
    </div>
  );
}
