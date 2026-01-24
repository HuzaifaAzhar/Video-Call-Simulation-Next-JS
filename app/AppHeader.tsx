"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LayoutAuthButton from "./LayoutAuthButton";

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="w-full border-b border-zinc-100 bg-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-blue-700 tracking-tight">
          <span className="inline-block w-2 h-6 bg-blue-600 rounded-full"></span>
          Video Chat
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 text-sm font-medium items-center">
          <Link href="/dashboard" className={`hover:text-blue-600 transition ${pathname.startsWith("/dashboard") ? "text-blue-600 font-bold" : "text-zinc-700"}`}>Dashboard</Link>
          <Link href="/chat" className={`hover:text-blue-600 transition ${pathname.startsWith("/chat") ? "text-blue-600 font-bold" : "text-zinc-700"}`}>Chat</Link>
          <Link href="/call" className={`hover:text-blue-600 transition ${pathname.startsWith("/call") ? "text-blue-600 font-bold" : "text-zinc-700"}`}>Call</Link>
          <span className="ml-2"><LayoutAuthButton /></span>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setMenuOpen(false)} />
      )}
      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg border-l border-zinc-100 transform transition-transform duration-200 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <span className="font-extrabold text-xl text-blue-700">Menu</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M6 14L14 6" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-6 text-base font-medium">
          <Link href="/dashboard" className={`py-2 px-2 rounded hover:bg-blue-50 transition ${pathname.startsWith("/dashboard") ? "bg-blue-600 text-white font-bold" : "text-zinc-700"}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link href="/chat" className={`py-2 px-2 rounded hover:bg-blue-50 transition ${pathname.startsWith("/chat") ? "bg-blue-600 text-white font-bold" : "text-zinc-700"}`} onClick={() => setMenuOpen(false)}>Chat</Link>
          <Link href="/call" className={`py-2 px-2 rounded hover:bg-blue-50 transition ${pathname.startsWith("/call") ? "bg-blue-600 text-white font-bold" : "text-zinc-700"}`} onClick={() => setMenuOpen(false)}>Call</Link>
          <div className="mt-4"><LayoutAuthButton /></div>
        </nav>
      </div>
    </header>
  );
}
