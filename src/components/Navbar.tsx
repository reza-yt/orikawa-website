"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">ORIKAWA</h1>
              <p className="text-xs text-gray-500">Indonesia</p>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Beranda
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
              Layanan
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Produk
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium">
              Project
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              Tentang
            </Link>
            <Link href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Hubungi Kami
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Beranda
            </Link>
            <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Layanan
            </Link>
            <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Produk
            </Link>
            <Link href="/projects" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Project
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Tentang
            </Link>
            <Link href="/contact" className="block px-3 py-2 bg-blue-600 text-white rounded-lg text-center">
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
