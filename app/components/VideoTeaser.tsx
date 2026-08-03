"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function VideoTeaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    v.play()
      .then(() => {
        if (!cancelled) setPlaying(true);
      })
      .catch(() => {
        if (!cancelled) setPlaying(false);
      });
    return () => {
      cancelled = true;
      v.pause();
    };
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  }

  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-teal-dark shadow-lift ring-1 ring-white/15">
      <video
        ref={videoRef}
        src="/video-mabim.mp4"
        poster="/hero-mabim.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="aspect-[16/9] w-full cursor-pointer object-cover"
      />

      {!playing && (
        <button
          type="button"
          aria-label="Putar video teaser Mabim"
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-teal-dark shadow-lift transition-transform group-hover:scale-105">
            <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      )}

      <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        <Play className="h-3.5 w-3.5" fill="currentColor" />
        Video Teaser Mabim
      </span>

      {playing && (
        <button
          type="button"
          aria-label="Jeda video"
          onClick={togglePlay}
          className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/65"
        >
          <Pause className="h-5 w-5" />
        </button>
      )}

      <button
        type="button"
        aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
        onClick={toggleMute}
        className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
