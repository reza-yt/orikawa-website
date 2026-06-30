"use client";

import Link from "next/link";
import { useConfig } from "@/lib/useConfig";

export default function ServicesPage() {
  const { config } = useConfig();

  const services = [
    {
      title: "Scaling Chiller",
      description: "Pembersihan kerak mineral (calcium carbonate, magnesium, silica) pada tube chiller. Scale setipis 1-2mm bisa turunkan efisiensi 20-30% dan naikkan konsumsi energi 10-20%.",
      details: ["Chemical cleaning dengan larutan asam khusus", "Mechanical cleaning dengan rotary brush", "High-pressure water jetting", "Corrosion inhibitor treatment"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Cleaning Cooling Tower",
      description: "Perawatan dan pembersihan cooling tower dari kotoran, lumut, biofilm, dan endapan mineral yang menghambat kinerja sistem pendingin.",
      details: ["Pembersihan basin dan fill media", "Treatment anti-lumut dan bakteri", "Inspeksi dan perbaikan komponen", "Water treatment chemical"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Chemical Cleaning AC & AHU",
      description: "Pembersihan sistem AC central dan AHU dari kerak, karat, dan kotoran yang menumpuk di evaporator, condenser, dan pipa-pipa.",
      details: ["Evaporator dan condenser cleaning", "Coil cleaning dan degreasing", "Pipa air dan refrigerant cleaning", "Filter dan duct cleaning"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Descaling Pipa Industri",
      description: "Pembersihan kerak dan karat pada pipa industri, heat exchanger, dan boiler system untuk mengembalikan efisiensi transfer panas.",
      details: ["Circulation chemical cleaning", "Soak cleaning untuk pipa besar", "Boiler tube cleaning", "Heat exchanger cleaning"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Layanan</p>
          <h1 className="reveal font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Solusi HVAC{" "}
            <span className="text-text-secondary font-light">Lengkap</span>
          </h1>
          <p className="reveal text-text-secondary text-lg max-w-2xl">
            Layanan profesional untuk sistem pendingin dan HVAC industri di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-6 stagger-children">
            {services.map((service, i) => (
              <div key={i} className="reveal group rounded-2xl border border-black/[0.06] bg-surface-1 p-8 lg:p-10 hover:border-black/[0.12] transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-text-secondary">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-1 border-y border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="reveal font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Butuh Konsultasi?
          </h2>
          <p className="reveal text-text-secondary mb-8">
            Hubungi kami untuk survey dan penawaran gratis
          </p>
          <Link href="/contact" className="reveal btn-primary inline-block">
            {config.hero.ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
}
