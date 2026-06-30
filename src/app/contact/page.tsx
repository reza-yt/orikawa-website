"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = `https://wa.me/6281234567890?text=Halo Orikawa Indonesia, saya ${form.name}. ${form.message}`;
    window.open(waUrl, "_blank");
    setSent(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-orange-100">Konsultasi gratis untuk kebutuhan HVAC Anda</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              {sent ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Terima kasih! Anda akan diarahkan ke WhatsApp kami.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium mb-1">Telepon/WhatsApp</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Subjek</label><select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="">Pilih...</option><option value="scaling">Scaling Chiller</option><option value="cleaning">Cleaning Cooling Tower</option><option value="chemical">Pembelian Chemical</option><option value="other">Lainnya</option></select></div>
                  <div><label className="block text-sm font-medium mb-1">Pesan</label><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 border rounded-lg h-32" required /></div>
                  <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">Kirim via WhatsApp</button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4"><span className="text-2xl">📍</span><div><h3 className="font-semibold">Alamat</h3><p className="text-gray-600">Jakarta, Indonesia</p></div></div>
                <div className="flex items-start space-x-4"><span className="text-2xl">📞</span><div><h3 className="font-semibold">WhatsApp</h3><p className="text-gray-600">+62 812-xxxx-xxxx</p></div></div>
                <div className="flex items-start space-x-4"><span className="text-2xl">✉️</span><div><h3 className="font-semibold">Email</h3><p className="text-gray-600">info@orikawa.id</p></div></div>
                <div className="flex items-start space-x-4"><span className="text-2xl">⏰</span><div><h3 className="font-semibold">Jam Kerja</h3><p className="text-gray-600">Senin - Sabtu: 08:00 - 17:00</p></div></div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Layanan Darurat?</h3>
                <p className="text-blue-600 text-sm mb-3">Hubungi kami untuk kebutuhan mendesak di luar jam kerja</p>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-green-700 text-sm">
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
