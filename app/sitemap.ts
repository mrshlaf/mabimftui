import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/kelompok`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tugas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/info`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/kontak`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
