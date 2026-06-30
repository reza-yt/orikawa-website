"use client";

import Link from "next/link";

export default function Home() {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Scaling Chiller",
      desc: "Pembersihan kerak mineral pada tube chiller untuk mengembalikan efisiensi pendinginan hingga optimal.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Cleaning Cooling Tower",
      desc: "Perawatan dan pembersihan cooling tower dari kotoran, lumut, dan endapan mineral.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Chemical Cleaning",
      desc: "Penjualan bahan kimia premium untuk pembersihan kerak dan karat pada sistem pendingin industri.",
    },
  ];

  const stats = [
    { value: "100+", label: "Project Selesai" },
    { value: "50+", label: "Klien Puas" },
    { value: "10+", label: "Tahun Pengalaman" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs text-text-secondary tracking-wide">HVAC Specialist · Indonesia</span>
            </div>

            {/* Heading */}
            <h1 className="reveal font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5">
              Scaling{" "}
              <span className="text-accent">Chiller</span>
              <br />
              <span className="text-text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
                & Chemical Cleaning
              </span>
            </h1>

            {/* Sub */}
            <p className="reveal text-text-secondary text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Jasa profesional pembersihan kerak, karat, dan endapan pada sistem HVAC industri. Efisiensi optimal, harga kompetitif.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Hubungi Kami
              </Link>
              <Link href="/services" className="btn-outline">
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/[0.06]">
            {stats.map((stat, i) => (
              <div key={i} className="reveal py-8 sm:py-10 px-4 sm:px-6 text-center">
                <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-text-secondary text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <p className="reveal text-accent text-xs tracking-[0.15em] uppercase font-medium mb-2">Layanan</p>
              <h2 className="reveal font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                Solusi HVAC <span className="text-text-secondary font-light">Lengkap</span>
              </h2>
            </div>
            <Link href="/services" className="reveal text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-1.5 group">
              Semua layanan
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {services.map((service, i) => (
              <div key={i} className="reveal group rounded-xl border border-black/[0.06] bg-white p-6 sm:p-7 hover:border-accent/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent-light flex items-center justify-center text-accent mb-5">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="reveal text-accent text-xs tracking-[0.15em] uppercase font-medium mb-2">Keunggulan</p>
            <h2 className="reveal font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Mengapa <span className="text-accent">Orikawa</span>?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger-children">
            {[
              { title: "Berpengalaman", desc: "Bertahun-tahun menangani sistem HVAC industri skala besar." },
              { title: "Tim Profesional", desc: "Teknisi terlatih dan bersertifikat untuk project Anda." },
              { title: "Chemical Premium", desc: "Bahan kimia import berkualitas tinggi, aman dan efektif." },
              { title: "Harga Kompetitif", desc: "Penawaran harga terbaik tanpa mengurangi kualitas." },
            ].map((item, i) => (
              <div key={i} className="reveal flex gap-4 p-5 rounded-xl border border-black/[0.06] bg-surface-2/50 hover:border-accent/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                  <span className="text-accent text-sm font-heading font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <p className="reveal text-accent text-xs tracking-[0.15em] uppercase font-medium mb-2">Mulai Sekarang</p>
          <h2 className="reveal font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Butuh Jasa Scaling Chiller?
          </h2>
          <p className="reveal text-text-secondary mb-8 max-w-md mx-auto">
            Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
          </p>
          <div className="reveal flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Hubungi Kami
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
