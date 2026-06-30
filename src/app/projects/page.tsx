"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Kami</h1>
          <p className="text-xl text-purple-100">Portofolio project scaling chiller dan chemical cleaning</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">Project akan segera ditampilkan</p>
          ) : (
            <div className="space-y-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {project.images?.length > 0 && (
                    <div className="flex overflow-x-auto gap-2 p-4 bg-gray-50">
                      {project.images.map((img: string, i: number) => (
                        <img key={i} src={img} alt="" className="h-48 rounded object-cover" />
                      ))}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      {project.client && <span>Klien: {project.client}</span>}
                      {project.location && <span>Lokasi: {project.location}</span>}
                      {project.date && <span>Tanggal: {project.date}</span>}
                    </div>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ingin Project Seperti Ini?</h2>
          <p className="text-gray-600 mb-6">Hubungi kami untuk konsultasi dan penawaran</p>
          <Link href="/contact" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 inline-block">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
