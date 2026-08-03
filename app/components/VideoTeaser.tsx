"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function VideoTeaser() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    function onChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
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

  function toggleFullscreen() {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      wrap.requestFullscreen().catch(() => {});
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`group relative overflow-hidden bg-teal-dark shadow-lift ring-1 ring-white/15 ${fullscreen ? "rounded-none bg-black" : "rounded-[2rem]"}`}
    >
      <video
        ref={videoRef}
        src="/video-mabim.mp4"
        poster="/hero-mabim.jpg"
        loop
        playsInline
        preload="none"
        onClick={togglePlay}
        className={`w-full cursor-pointer object-cover ${fullscreen ? "h-full" : "aspect-[16/9]"}`}
      />

      {!playing && (
        <button
          type="button"
          aria-label="Putar teaser Mabim"
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
        Teaser Mabim
      </span>

      {playing && (
        <button
          type="button"
          aria-label="Jeda video"
          onClick={togglePlay}
          className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white opacity-100 backdrop-blur transition-colors hover:bg-black/65 md:opacity-0 md:group-hover:opacity-100"
        >
          <Pause className="h-5 w-5" />
        </button>
      )}

      {playing && (
        <button
          type="button"
          aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
          onClick={toggleMute}
          className="absolute bottom-4 right-16 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      {playing && (
        <button
          type="button"
          aria-label={fullscreen ? "Keluar fullscreen" : "Fullscreen"}
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
        >
          {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}
