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
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Kontak</p>
          <h1 className="reveal font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Hubungi{" "}
            <span className="text-text-secondary font-light">Kami</span>
          </h1>
          <p className="reveal text-text-secondary text-lg max-w-2xl">
            Konsultasi gratis untuk kebutuhan HVAC Anda.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="reveal rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">Terima Kasih!</h3>
                  <p className="text-text-secondary text-sm">Anda akan diarahkan ke WhatsApp kami.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 reveal">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Nama</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
                        placeholder="email@domain.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Telepon / WhatsApp</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
                        placeholder="+62 812-xxxx-xxxx"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Subjek</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
                      >
                        <option value="">Pilih layanan...</option>
                        <option value="scaling">Scaling Chiller</option>
                        <option value="cleaning">Cleaning Cooling Tower</option>
                        <option value="chemical">Pembelian Chemical</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">Pesan</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted h-32 resize-none"
                      placeholder="Ceritakan kebutuhan Anda..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full !py-4">
                    Kirim via WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6 reveal-right">
              <h3 className="font-heading text-xl font-semibold mb-6">Informasi Kontak</h3>
              {[
                { icon: "📍", label: "Alamat", value: "Jakarta, Indonesia" },
                { icon: "📞", label: "WhatsApp", value: "+62 812-xxxx-xxxx" },
                { icon: "✉️", label: "Email", value: "info@orikawa.id" },
                { icon: "⏰", label: "Jam Kerja", value: "Senin - Sabtu: 08:00 - 17:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-black/[0.06] bg-surface-1">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs text-text-muted tracking-wide uppercase mb-1">{item.label}</p>
                    <p className="text-text-primary text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Emergency */}
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <h4 className="font-heading font-semibold text-accent mb-2">Layanan Darurat?</h4>
                <p className="text-text-secondary text-sm mb-4">Hubungi kami untuk kebutuhan mendesak di luar jam kerja</p>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dim transition-colors"
                >
                  Chat WhatsApp
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
