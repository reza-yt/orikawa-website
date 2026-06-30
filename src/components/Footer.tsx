import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ORIKAWA</h3>
            <p className="text-gray-400">
              Specialist Scaling Chiller & Chemical Cleaning Indonesia
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white">Scaling Chiller</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Cleaning Cooling Tower</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Chemical Cleaning</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white">Maintenance AC & AHU</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white">Descaler Chemical</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white">Rust Remover</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white">Cleaning Agent</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white">Inhibitor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Jakarta, Indonesia</li>
              <li>Email: info@orikawa.id</li>
              <li>WhatsApp: +62 812-xxxx-xxxx</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Orikawa Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
