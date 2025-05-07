"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";

const bgUrl = "https://images.unsplash.com/photo-1562713682-cde79058b2b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHdpbmUlMjBnbGFzc3xlbnwwfHwwfHx8MA%3D%3D";

const menu = [
  { label: "Food", href: "/food" },
  { label: "Interiors", href: "/interiors" },
  { label: "Social Media", href: "/social-media" },
  { label: "Reel", href: "/reel" },
  { label: "Contact", href: "/contact" },
  { label: "Instagram", href: "https://instagram.com/estudio.ampersand", external: true },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 700); // フェードアウト後に非表示
    }, 1800); // ローディング表示時間
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#212227',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.7s',
          opacity: fade ? 0 : 1,
          pointerEvents: fade ? 'none' : 'auto',
        }}>
          <Loader />
        </div>
      )}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen pt-64">
        <div className="text-4xl font-bold mb-6 tracking-tight text-gray-900"><span className="inline-flex items-center">Lux<span className="text-yellow-500 ml-0.5">.</span></span></div>
        <div className="text-1xl font-bold mb-12 tracking-tight text-gray-900">photographs, luxury and sophisticated</div>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-400 z-10">
        Background photo from Unsplash
      </div>
    </main>
  );
}
