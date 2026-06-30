"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("orikawa_admin_token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-xl font-bold text-blue-600">
            Orikawa Admin
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Lihat Website
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("orikawa_admin_token");
                setIsAuthenticated(false);
              }}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-screen p-4">
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
              Dashboard
            </Link>
            <Link href="/admin/posts" className="block px-4 py-2 rounded hover:bg-gray-100">
              Postingan
            </Link>
            <Link href="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-100">
              Produk
            </Link>
            <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-gray-100">
              Project
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-100">
              Pengaturan
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
