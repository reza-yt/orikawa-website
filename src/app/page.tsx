"use client";

import Link from "next/link";

function FloatingOrb({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-20 ${className}`} />
  );
}

export default function Home() {
  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
          <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Scaling Chiller",
      desc: "Pembersihan kerak mineral pada tube chiller untuk mengembalikan efisiensi pendinginan hingga 100%.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Cooling Tower",
      desc: "Perawatan dan pembersihan cooling tower dari kotoran, lumut, dan endapan mineral.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background orbs */}
        <FloatingOrb className="w-[600px] h-[600px] bg-accent/30 top-[-20%] right-[-10%]" />
        <FloatingOrb className="w-[400px] h-[400px] bg-warm/20 bottom-[-10%] left-[-5%]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-surface-1/50 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs text-text-secondary tracking-wide">HVAC Specialist · Indonesia</span>
            </div>

            {/* Heading */}
            <h1 className="reveal font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              Scaling{" "}
              <span className="gradient-text">Chiller</span>
              <br />
              <span className="text-text-secondary text-4xl md:text-5xl lg:text-6xl font-light">
                & Chemical Cleaning
              </span>
            </h1>

            {/* Sub */}
            <p className="reveal text-text-secondary text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Jasa profesional pembersihan kerak, karat, dan endapan pada sistem HVAC industri. Efisiensi optimal, harga kompetitif.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Hubungi Kami
              </Link>
              <Link href="/services" className="btn-outline">
                Lihat Layanan
              </Link>
            </div>
          </div>


        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-text-muted" />
          <span className="text-[10px] text-text-muted tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-black/[0.06] bg-surface-1/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/[0.06]">
            {stats.map((stat, i) => (
              <div key={i} className="reveal py-10 px-6 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 relative">
        <FloatingOrb className="w-[500px] h-[500px] bg-accent/10 top-1/3 left-[-15%]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Layanan</p>
              <h2 className="reveal font-heading text-4xl md:text-5xl font-bold tracking-tight">
                Solusi HVAC{" "}
                <span className="text-text-secondary font-light">Lengkap</span>
              </h2>
            </div>
            <Link href="/services" className="reveal text-text-secondary text-sm hover:text-accent transition-colors flex items-center gap-2 group">
              Semua layanan
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {services.map((service, i) => (
              <div key={i} className="reveal group relative rounded-2xl border border-black/[0.06] bg-surface-1 p-8 h-full hover:border-black/[0.12] transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 lg:py-32 bg-surface-1 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-warm/10 bottom-0 right-[-10%]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Keunggulan</p>
              <h2 className="reveal font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Mengapa{" "}
                <span className="gradient-text">Orikawa</span>?
              </h2>
              <div className="space-y-6 stagger-children">
                {[
                  { title: "Berpengalaman", desc: "Bertahun-tahun menangani sistem HVAC industri skala besar." },
                  { title: "Tim Profesional", desc: "Teknisi terlatih dan bersertifikat untuk project Anda." },
                  { title: "Chemical Premium", desc: "Bahan kimia import berkualitas tinggi, aman dan efektif." },
                  { title: "Harga Kompetitif", desc: "Penawaran harga terbaik tanpa mengurangi kualitas." },
                ].map((item, i) => (
                  <div key={i} className="reveal flex gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <span className="text-accent text-sm font-heading font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                      <p className="text-text-secondary text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side */}
            <div className="reveal-right relative">
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl border border-black/[0.06] bg-surface-2 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-warm/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 animate-float">
                        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-accent" stroke="currentColor" strokeWidth={1}>
                          <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-heading text-3xl font-bold gradient-text mb-1">10+ Tahun</p>
                      <p className="text-text-secondary text-sm">Pengalaman industri HVAC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 relative">
        <FloatingOrb className="w-[500px] h-[500px] bg-accent/10 top-0 left-1/2 -translate-x-1/2" />

        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Mulai Sekarang</p>
          <h2 className="reveal font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Butuh Jasa{" "}
            <span className="gradient-text">Scaling Chiller</span>?
          </h2>
          <p className="reveal text-text-secondary text-lg mb-10 max-w-lg mx-auto">
            Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
          </p>
          <div className="reveal flex flex-wrap gap-4 justify-center">
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
