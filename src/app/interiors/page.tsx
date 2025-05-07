"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Interior 1",
    author: "Francesca Tosolini",
    url: "https://unsplash.com/photos/DmOhItSo49k",
  },
  {
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    alt: "Interior 2",
    author: "Collov Home Design",
    url: "https://unsplash.com/photos/wD1LRb9OeEo",
  },
  {
    src: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80",
    alt: "Interior 3",
    author: "Jason Briscoe",
    url: "https://unsplash.com/photos/7MAjXGUmaPw",
  },
  {
    src: "https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5c?auto=format&fit=crop&w=800&q=80",
    alt: "Interior 4",
    author: "Patrick Perkins",
    url: "https://unsplash.com/photos/3wylDrjxH-E",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    alt: "Interior 5",
    author: "Patrick Perkins",
    url: "https://unsplash.com/photos/1nashvFqS8E",
  },
];

export default function InteriorsPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Interiors Photography</h1>
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