import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Specialist Scaling Chiller
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Jasa Profesional Cleaning & Chemical untuk Sistem HVAC Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Scaling Chiller</h3>
              <p className="text-gray-600">
                Pembersihan kerak mineral pada tube chiller untuk mengembalikan efisiensi pendinginan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-2">Cleaning Cooling Tower</h3>
              <p className="text-gray-600">
                Perawatan dan pembersihan cooling tower dari kotoran, lumut, dan endapan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold mb-2">Chemical Cleaning</h3>
              <p className="text-gray-600">
                Penjualan bahan kimia khusus untuk membersihkan kerak dan karat pada sistem HVAC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-2xl">✓</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Berpengalaman</h3>
                <p className="text-gray-600">Bertahun-tahun pengalaman dalam menangani sistem HVAC industri.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-2xl">✓</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tim Profesional</h3>
                <p className="text-gray-600">Teknisi terlatih dan bersertifikat untuk menangani project Anda.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-2xl">✓</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Chemical Berkualitas</h3>
                <p className="text-gray-600">Menggunakan bahan kimia premium yang aman dan efektif.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-2xl">✓</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Harga Kompetitif</h3>
                <p className="text-gray-600">Penawaran harga terbaik dengan kualitas layanan prima.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Jasa Scaling Chiller?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition inline-block"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
