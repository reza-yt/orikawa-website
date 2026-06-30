"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("orikawa_admin_token");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("orikawa_admin_token", data.token);
      setIsAuthenticated(true);
    } else {
      setError("Username atau password salah");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold tracking-tight">
              ORI<span className="text-accent">KAWA</span>
            </h1>
            <p className="text-text-muted text-xs tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-surface-1 p-8">
            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
                  placeholder="admin"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted tracking-wide uppercase mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-black/[0.08] text-text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-text-muted"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary !py-3.5"
              >
                Masuk
              </button>
            </form>
          </div>

          <p className="text-center text-text-muted text-xs mt-6">
            <Link href="/" className="text-text-secondary hover:text-accent transition-colors">
              ← Kembali ke website
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
    { href: "/admin/posts", label: "Postingan", icon: "¶" },
    { href: "/admin/products", label: "Produk", icon: "◆" },
    { href: "/admin/projects", label: "Project", icon: "□" },
    { href: "/admin/settings", label: "Pengaturan", icon: "⚙" },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface-1 border-r border-black/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-black/[0.06]">
          <Link href="/admin/dashboard">
            <span className="font-heading font-bold text-lg">
              ORI<span className="text-accent">KAWA</span>
            </span>
            <span className="text-text-muted text-[10px] tracking-[0.15em] uppercase ml-2">Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              }`}
            >
              <span className="w-5 text-center text-xs opacity-60">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-black/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
          >
            <span className="w-5 text-center text-xs opacity-60">↗</span>
            Lihat Website
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("orikawa_admin_token");
              setIsAuthenticated(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-red-400 hover:bg-red-500/5 transition-colors w-full"
          >
            <span className="w-5 text-center text-xs opacity-60">⏻</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-surface/80 backdrop-blur-xl border-b border-black/[0.06] flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-text-secondary hover:text-text-primary"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-accent text-xs font-heading font-bold">A</span>
            </div>
            <span className="text-sm text-text-secondary hidden sm:block">Admin</span>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
