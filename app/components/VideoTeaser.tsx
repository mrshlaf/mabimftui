"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "b4e9hyJ0DIg";

export default function VideoTeaser() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-teal-dark shadow-lift ring-1 ring-white/15">
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
          className="absolute inset-0 grid place-items-center"
        >
          <Image
            src="/hero-mabim.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="hero-pulse pointer-events-none absolute h-16 w-16 rounded-full bg-white/70"
          />
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-teal-dark shadow-lift transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      )}

      <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        <Play className="h-3.5 w-3.5" fill="currentColor" />
        Teaser Mabim
      </span>
    </div>
  );
}
