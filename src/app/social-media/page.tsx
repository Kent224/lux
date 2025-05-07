"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    alt: "Social Media 1",
    author: "Priscilla Du Preez",
    url: "https://unsplash.com/photos/7rCF4gKnp8o",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    alt: "Social Media 2",
    author: "NordWood Themes",
    url: "https://unsplash.com/photos/8LfE0Lywyak",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    alt: "Social Media 3",
    author: "William Iven",
    url: "https://unsplash.com/photos/SpVHcbuKi6E",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    alt: "Social Media 4",
    author: "Patrick Perkins",
    url: "https://unsplash.com/photos/1nashvFqS8E",
  },
  {
    src: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302c?auto=format&fit=crop&w=800&q=80",
    alt: "Social Media 5",
    author: "Ben Kolde",
    url: "https://unsplash.com/photos/FFqNATH27EM",
  },
];

export default function SocialMediaPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Social Media Content</h1>
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