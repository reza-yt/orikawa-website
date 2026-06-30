import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothLenis from "@/components/SmoothLenis";

export const metadata: Metadata = {
  title: "Orikawa Indonesia — Specialist Scaling Chiller & Chemical Cleaning",
  description: "Jasa scaling chiller, cleaning cooling tower, dan penjualan chemical cleaning untuk kerak dan karat di AC, AHU, pipa industri. Profesional dan terpercaya.",
  keywords: "scaling chiller, cleaning cooling tower, chemical cleaning, orikawa, indonesia, jasa chiller, kerak chiller, karat pipa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Preloader />
        <SmoothLenis />
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
