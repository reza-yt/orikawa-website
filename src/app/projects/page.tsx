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
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="reveal text-accent text-xs tracking-[0.2em] uppercase font-medium mb-3">Project</p>
          <h1 className="reveal font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Portofolio{" "}
            <span className="text-text-secondary font-light">Kami</span>
          </h1>
          <p className="reveal text-text-secondary text-lg max-w-2xl">
            Project scaling chiller dan chemical cleaning yang telah kami kerjakan.
          </p>
        </div>
      </section>

      {/* Projects list */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">Project akan segera ditampilkan</p>
            </div>
          ) : (
            <div className="space-y-6 stagger-children">
              {projects.map((project) => (
                <div key={project.id} className="reveal rounded-2xl border border-black/[0.06] bg-surface-1 overflow-hidden hover:border-black/[0.12] transition-colors">
                  {project.images?.length > 0 && (
                    <div className="flex overflow-x-auto gap-3 p-4 bg-surface-2 scrollbar-hide">
                      {project.images.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="h-48 rounded-xl object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="font-heading text-2xl font-bold mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                      {project.client && <span className="flex items-center gap-1.5"><span className="text-accent">→</span> {project.client}</span>}
                      {project.location && <span className="flex items-center gap-1.5"><span className="text-accent">→</span> {project.location}</span>}
                      {project.date && <span className="flex items-center gap-1.5"><span className="text-accent">→</span> {project.date}</span>}
                    </div>
                    <p className="text-text-secondary leading-relaxed">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface-1 border-y border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="reveal font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ingin Project Seperti Ini?
          </h2>
          <p className="reveal text-text-secondary mb-8">
            Hubungi kami untuk konsultasi dan penawaran
          </p>
          <Link href="/contact" className="reveal btn-primary inline-block">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
