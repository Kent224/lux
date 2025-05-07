"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useImages } from "@/hooks/useImages";
import Loader from "../components/Loader";

export default function FoodPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { images, loading, error } = useImages("food");
  console.log('画面で受け取ったimages:', images);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [minLoadingDone, setMinLoadingDone] = useState(false);

  useEffect(() => {
    setImagesLoaded(0);
  }, [images.length]);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingDone(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (error) return <div>エラー: {error}</div>;
  if (images.length === 0 && !loading && minLoadingDone)
    return (
      <main className="max-w-5xl mx-auto py-12 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-3xl text-gray-400 font-bold text-center select-none">No photo,</div>
      </main>
    );

  const showLoader = loading || !minLoadingDone;

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 relative">
      {showLoader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <Loader />
        </div>
      )}
      <div style={{ opacity: showLoader ? 0 : 1, transition: "opacity 0.3s" }}>
        <h1 className="text-3xl font-bold mb-8">Food Photography</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <button
              key={img.id}
              className="group relative focus:outline-none fade-in-up"
              style={{ animationDelay: `${i * 0.12 + 0.08}s` }}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-60 object-cover rounded shadow hover:scale-105 transition-transform duration-200"
                loading="lazy"
                onLoad={() => setImagesLoaded((v) => v + 1)}
                onError={() => setImagesLoaded((v) => v + 1)}
              />
              <span className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Photo by {img.author}
              </span>
            </button>
          ))}
        </div>
        {images.length === 0 && !showLoader && (
          <div className="text-3xl text-gray-400 font-bold text-center select-none mt-24">No photo,</div>
        )}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((img) => ({ src: img.url, alt: img.alt }))}
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
        />
      </div>
    </main>
  );
} 