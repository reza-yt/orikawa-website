export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tentang Orikawa Indonesia</h1>
          <p className="text-xl text-gray-300">Specialist Scaling Chiller & Chemical Cleaning</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Siapa Kami?</h2>
              <p className="text-gray-600 mb-4">
                Orikawa Indonesia adalah perusahaan yang bergerak di bidang jasa pembersihan dan perawatan sistem HVAC (Heating, Ventilation, and Air Conditioning). Kami spesialis dalam scaling chiller, cleaning cooling tower, dan chemical cleaning untuk berbagai kebutuhan industri.
              </p>
              <p className="text-gray-600 mb-4">
                Dengan pengalaman bertahun-tahun, kami telah menangani berbagai project di gedung perkantoran, pabrik, rumah sakit, hotel, dan fasilitas industri lainnya.
              </p>
              <p className="text-gray-600">
                Kami juga menyediakan berbagai produk chemical berkualitas tinggi untuk kebutuhan pembersihan kerak, karat, dan kotoran pada sistem pendingin dan pipa industri.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Keunggulan Kami</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Tim Berpengalaman</h3>
                    <p className="text-gray-600 text-sm">Teknisi terlatih dan bersertifikat dengan pengalaman puluhan tahun</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Chemical Premium</h3>
                    <p className="text-gray-600 text-sm">Menggunakan bahan kimia import berkualitas tinggi dan aman</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Peralatan Modern</h3>
                    <p className="text-gray-600 text-sm">Dilengkapi peralatan cleaning terbaru dan terkalibrasi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <h3 className="font-semibold">Harga Kompetitif</h3>
                    <p className="text-gray-600 text-sm">Penawaran harga terbaik dengan kualitas layanan prima</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mitra Terpercaya Anda</h2>
          <p className="text-xl text-blue-100 mb-8">Melayani kebutuhan HVAC dan chemical cleaning di seluruh Indonesia</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div><p className="text-4xl font-bold">100+</p><p className="text-blue-200">Project Selesai</p></div>
            <div><p className="text-4xl font-bold">50+</p><p className="text-blue-200">Klien Puas</p></div>
            <div><p className="text-4xl font-bold">10+</p><p className="text-blue-200">Tahun Pengalaman</p></div>
            <div><p className="text-4xl font-bold">24/7</p><p className="text-blue-200">Support</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
