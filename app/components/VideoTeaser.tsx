"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "b4e9hyJ0DIg";

export default function VideoTeaser() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-teal-dark shadow-lift ring-1 ring-white/15">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="Teaser Mabim FTUI 2026"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          aria-label="Putar teaser Mabim"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 grid place-items-center cursor-pointer"
        >
          <Image
            src="/hero-mabim.jpg"
            alt="Poster video teaser Mabim FTUI 2026"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-teal-dark/30 transition-opacity group-hover:bg-teal-dark/20" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/95 text-teal-dark shadow-lift transition-transform duration-300 group-hover:scale-110 active:scale-95">
            <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
          </span>
        </button>
      )}

      <span className="pointer-events-none absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
        <Play className="h-3 w-3" fill="currentColor" />
        Teaser Video
      </span>
    </div>
  );
}
