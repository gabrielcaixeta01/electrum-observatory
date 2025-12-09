"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 inset-x-0 backdrop-blur bg-black/30 border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="font-semibold text-lg">
            Electrum Observatory
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6 text-sm text-gray-300">
            <Link href="/methodology">Methodology</Link>
            <Link href="/server-metadata">Server Metadata</Link>
            <Link href="/honeypots">Honeypot Indicators</Link>
            <Link href="/results">Results</Link>
            <Link href="/network-topology">Network Topology</Link>
            <Link href="/about">About</Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-gray-200 hover:text-white transition"
            onClick={() => setOpen(true)}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none"
            >
              <path d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
        </div>
      </nav>

      {/* BACKDROP (darkens background + smooth fade) */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SLIDE-OVER MENU */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 z-50
          bg-black/60 backdrop-blur-xl border-l border-white/10
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col p-6 space-y-6 text-gray-200 pt-20">

          <Link href="/methodology" onClick={() => setOpen(false)}>
            Methodology
          </Link>

          <Link href="/results" onClick={() => setOpen(false)}>
            Results
          </Link>

          <Link href="/server-metadata" onClick={() => setOpen(false)}>
            Server Metadata
          </Link>

          <Link href="/network-topology" onClick={() => setOpen(false)}>
            Network Topology
          </Link>

          <Link href="/honeypots" onClick={() => setOpen(false)}>
            Honeypot Indicators
          </Link>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      </div>
    </>
  );
}