"use client";

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
  return (
    <main>
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
        <div className="text-4xl font-bold mb-6 tracking-tight text-gray-900 fade-in-right"><span className="inline-flex items-center">Lux<span className="text-yellow-500 ml-0.5">.</span></span></div>
        <div className="text-1xl mb-12 tracking-tight text-gray-900 fade-in-up-light">photographs, luxury and sophisticated</div>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-400 z-10">
        powered by Create New One, Inc. 2025, all rights reserved.
      </div>
    </main>
  );
}
