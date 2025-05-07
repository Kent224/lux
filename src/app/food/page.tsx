"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    alt: "Food 1",
    author: "Brooke Lark",
    url: "https://unsplash.com/photos/t7wgqkQp9FA",
  },
  {
    src: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=800&q=80",
    alt: "Food 2",
    author: "Eaters Collective",
    url: "https://unsplash.com/photos/12eHC6FxPyg",
  },
  {
    src: "https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=800&q=80",
    alt: "Food 3",
    author: "Joseph Gonzalez",
    url: "https://unsplash.com/photos/4QKQ8VkoKR8",
  },
  {
    src: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    alt: "Food 4",
    author: "Eiliv Aceron",
    url: "https://unsplash.com/photos/2Ts5HnA67k8",
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    alt: "Food 5",
    author: "Jez Timms",
    url: "https://unsplash.com/photos/8xznAGy4HcY",
  },
];

export default function FoodPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Food Photography</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="group relative focus:outline-none"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-60 object-cover rounded shadow hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <span className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Photo by {img.author}
            </span>
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-6">
        Photos from Unsplash. クレジット: {" "}
        {images.map((img, i) => (
          <span key={img.url}>
            <a href={img.url} target="_blank" rel="noopener noreferrer" className="underline">
              {img.author}
            </a>
            {i < images.length - 1 && ", "}
          </span>
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </main>
  );
} 