import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Scaling Chiller",
      icon: "🔧",
      description: "Pembersihan kerak mineral (calcium carbonate, magnesium, silica) pada tube chiller. Scale setipis 1-2mm bisa turunkan efisiensi 20-30% dan naikkan konsumsi energi 10-20%.",
      details: ["Chemical cleaning dengan larutan asam khusus", "Mechanical cleaning dengan rotary brush", "High-pressure water jetting", "Corrosion inhibitor treatment"],
    },
    {
      title: "Cleaning Cooling Tower",
      icon: "🏗️",
      description: "Perawatan dan pembersihan cooling tower dari kotoran, lumut, biofilm, dan endapan mineral yang menghambat kinerja sistem pendingin.",
      details: ["Pembersihan basin dan fill media", "Treatment anti-lumut dan bakteri", "Inspeksi dan perbaikan komponen", "Water treatment chemical"],
    },
    {
      title: "Chemical Cleaning AC & AHU",
      icon: "❄️",
      description: "Pembersihan sistem AC central dan AHU dari kerak, karat, dan kotoran yang menumpuk di evaporator, condenser, dan pipa-pipa.",
      details: ["Evaporator dan condenser cleaning", "Coil cleaning dan degreasing", "Pipa air dan refrigerant cleaning", "Filter dan duct cleaning"],
    },
    {
      title: "Descaling Pipa Industri",
      icon: "🏭",
      description: "Pembersihan kerak dan karat pada pipa industri, heat exchanger, dan boiler system untuk mengembalikan efisiensi transfer panas.",
      details: ["Circulation chemical cleaning", "Soak cleaning untuk pipa besar", "Boiler tube cleaning", "Heat exchanger cleaning"],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Layanan Kami</h1>
          <p className="text-xl text-blue-100">Solusi lengkap untuk sistem HVAC dan pendingin industri</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{service.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          {detail}
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

      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi?</h2>
          <p className="mb-6 text-blue-100">Hubungi kami untuk survey dan penawaran gratis</p>
          <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 inline-block">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
