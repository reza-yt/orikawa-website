"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfig } from "@/lib/useConfig";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { config } = useConfig();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/services", label: "Layanan" },
    { href: "/products", label: "Produk" },
    { href: "/projects", label: "Project" },
    { href: "/about", label: "Tentang" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-heading font-bold tracking-tight">
              ORI<span className="text-accent">KAWA</span>
            </h1>
            <p className="text-[9px] tracking-[0.2em] text-text-muted uppercase -mt-0.5">
              {config.site.tagline}
            </p>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary ml-3 !py-2 !px-5 !text-sm"
            >
              {config.hero.ctaText}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 items-center">
              <span
                className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-200 origin-center ${
                  isOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`block w-3.5 h-[1.5px] bg-text-primary transition-all duration-200 ${
                  isOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-200 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mt-2 rounded-xl p-4 space-y-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent bg-accent-light"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block btn-primary text-center text-sm mt-2"
          >
            {config.hero.ctaText}
          </Link>
        </div>
      </div>
    </nav>
  );
}
