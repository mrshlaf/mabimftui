import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admingacor", "/admingacor/", "/api/admin/", "/api/admin"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admingacor", "/admingacor/", "/api/admin/", "/api/admin"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admingacor", "/admingacor/", "/api/admin/", "/api/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
