import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/kelompok",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/tugas",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  async headers() {
    const staticCache = [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ];
    return [
      {
        source: "/hero-mabim.jpg",
        headers: staticCache,
      },
      {
        source: "/bg-site.jpg",
        headers: staticCache,
      },
      {
        source: "/bg-kelompok.jpg",
        headers: staticCache,
      },
      {
        source: "/bg-info.jpg",
        headers: staticCache,
      },
      {
        source: "/bg-kontak.jpg",
        headers: staticCache,
      },
      {
        source: "/logo-mabim.png",
        headers: staticCache,
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://img.youtube.com https://i.ytimg.com",
              "font-src 'self' data:",
              "media-src 'self'",
              "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
              "connect-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
