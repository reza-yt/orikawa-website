export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Tentang Kami</p>
          <h1 className="reveal font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Orikawa <span className="text-text-secondary font-light">Indonesia</span>
          </h1>
          <p className="reveal text-text-secondary text-lg max-w-2xl">
            Specialist scaling chiller & chemical cleaning untuk sistem HVAC industri.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="reveal font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Siapa Kami?
              </h2>
              <div className="space-y-4 reveal text-text-secondary leading-relaxed">
                <p>
                  Orikawa Indonesia adalah perusahaan yang bergerak di bidang jasa pembersihan dan perawatan sistem HVAC. Kami spesialis dalam scaling chiller, cleaning cooling tower, dan chemical cleaning untuk berbagai kebutuhan industri.
                </p>
                <p>
                  Dengan pengalaman bertahun-tahun, kami telah menangani berbagai project di gedung perkantoran, pabrik, rumah sakit, hotel, dan fasilitas industri lainnya.
                </p>
                <p>
                  Kami juga menyediakan berbagai produk chemical berkualitas tinggi untuk kebutuhan pembersihan kerak, karat, dan kotoran pada sistem pendingin dan pipa industri.
                </p>
              </div>
            </div>

            <div className="stagger-children space-y-4">
              {[
                { title: "Tim Berpengalaman", desc: "Teknisi terlatih dan bersertifikat dengan pengalaman puluhan tahun" },
                { title: "Chemical Premium", desc: "Bahan kimia import berkualitas tinggi dan aman" },
                { title: "Peralatan Modern", desc: "Dilengkapi peralatan cleaning terbaru dan terkalibrasi" },
                { title: "Harga Kompetitif", desc: "Penawaran harga terbaik dengan kualitas layanan prima" },
              ].map((item, i) => (
                <div key={i} className="reveal flex gap-4 p-5 rounded-xl border border-black/[0.06] bg-surface-1 hover:border-black/[0.12] transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="text-accent font-heading font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface-1 border-y border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100+", label: "Project Selesai" },
              { value: "50+", label: "Klien Puas" },
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="reveal text-center">
                <p className="font-heading text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
