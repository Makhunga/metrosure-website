"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components";
import { useState } from "react";

const experiments = [
  { id: "typography", title: "Typography", icon: "text_fields" },
  { id: "buttons", title: "Buttons", icon: "smart_button" },
  { id: "cards", title: "Cards", icon: "dashboard" },
  { id: "forms", title: "Forms", icon: "input" },
  { id: "animations", title: "Animations", icon: "animation" },
  { id: "colors", title: "Colors", icon: "palette" },
  { id: "scratch", title: "Scratch", icon: "edit_note" },
];

export default function PlaygroundShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isIndex = pathname === "/playground";

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen">
      <Header />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop (hidden on index) */}
            {!isIndex && (
              <aside className="hidden lg:block w-56 flex-shrink-0">
                <div className="sticky top-36">
                  <Link
                    href="/playground"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">science</span>
                    Playground
                  </Link>
                  <nav className="space-y-1">
                    {experiments.map((exp) => {
                      const isActive = pathname === `/playground/${exp.id}`;
                      return (
                        <Link
                          key={exp.id}
                          href={`/playground/${exp.id}`}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {exp.icon}
                          </span>
                          {exp.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            )}

            {/* Mobile sidebar toggle (hidden on index) */}
            {!isIndex && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
              >
                <span className="material-symbols-outlined">
                  {sidebarOpen ? "close" : "menu"}
                </span>
              </button>
            )}

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              >
                <aside
                  className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-800 p-6 pt-36 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    href="/playground"
                    className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="material-symbols-outlined">science</span>
                    Playground
                  </Link>
                  <nav className="space-y-1">
                    {experiments.map((exp) => {
                      const isActive = pathname === `/playground/${exp.id}`;
                      return (
                        <Link
                          key={exp.id}
                          href={`/playground/${exp.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {exp.icon}
                          </span>
                          {exp.title}
                        </Link>
                      );
                    })}
                  </nav>
                </aside>
              </div>
            )}

            {/* Main content */}
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
