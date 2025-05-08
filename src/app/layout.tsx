"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lux-favicon.webp" type="image/webp" />
        <link rel="icon" href="/lux-favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full flex justify-between items-center px-4 md:px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-50" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>
          <a href="/" className="text-3xl font-bold tracking-tight flex items-center select-none" style={{ textDecoration: 'none' }}>
            <span>Lux</span>
            <span className="text-yellow-500 ml-0.5">.</span>
          </a>
          {/* PCメニュー */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-lg font-medium">
              <li><a href="/food" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Food</a></li>
              <li><a href="/interiors" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Interiors</a></li>
              <li><a href="/landscape" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Landscape</a></li>
              <li><a href="/portraits" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Portraits</a></li>
              <li><a href="/contact" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Contact</a></li>
              <li><a href="https://instagram.com/estudio.ampersand" target="_blank" rel="noopener noreferrer" className="nav-underline-link" style={{ color: '#171717', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>Instagram</a></li>
            </ul>
          </nav>
          {/* ハンバーガーアイコン（モバイル） */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block w-7 h-0.5 bg-neutral-900 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-neutral-900 rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-neutral-900 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          {/* モバイルメニュー */}
          {menuOpen && (
            <nav className="absolute top-full left-0 w-full bg-white shadow-md border-b border-gray-200 md:hidden z-50">
              <ul className="flex flex-col py-4 text-lg font-medium">
                {[
                  { label: "Food", href: "/food" },
                  { label: "Interiors", href: "/interiors" },
                  { label: "Landscape", href: "/landscape" },
                  { label: "Portraits", href: "/portraits" },
                  { label: "Contact", href: "/contact" },
                  { label: "Instagram", href: "https://instagram.com/estudio.ampersand", external: true },
                ].map((item, i) => (
                  <li
                    key={item.label}
                    style={{
                      animation: `slideInRight 0.5s cubic-bezier(.4,0,.2,1) forwards`,
                      animationDelay: `${0.08 * i + 0.08}s`,
                      opacity: 0,
                    }}
                  >
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="px-6 py-3 block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
