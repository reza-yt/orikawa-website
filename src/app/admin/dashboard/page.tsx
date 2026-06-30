"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, products: 0, projects: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ]).then(([posts, products, projects]) => {
      setStats({
        posts: posts.length,
        products: products.length,
        projects: projects.length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Postingan</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.posts}</p>
          <Link href="/admin/posts" className="text-blue-600 text-sm hover:underline">
            Kelola →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Produk</h3>
          <p className="text-3xl font-bold text-green-600">{stats.products}</p>
          <Link href="/admin/products" className="text-green-600 text-sm hover:underline">
            Kelola →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Project</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.projects}</p>
          <Link href="/admin/projects" className="text-purple-600 text-sm hover:underline">
            Kelola →
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link href="/admin/posts?new=1" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Postingan Baru
          </Link>
          <Link href="/admin/products?new=1" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Produk Baru
          </Link>
          <Link href="/admin/projects?new=1" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            + Project Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
