import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { LOCALES } from "@/i18n/locales";

const NICHE_PATHS = ["/climatisation", "/plomberie", "/electricite"];
const CONTENT_PATHS = ["/a-propos", "/guide-appels-manques", "/guide-avis-google"];
const PATHS = ["", "/calculadora", ...NICHE_PATHS, ...CONTENT_PATHS, "/aviso-legal", "/privacidad", "/cookies"];

/** Fecha real de la última revisión de contenido (actualizar al cambiar los textos). */
const LAST_MODIFIED = new Date("2026-10-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_MODIFIED;
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
    );

    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/calculadora" ? 0.9 : NICHE_PATHS.includes(path) || CONTENT_PATHS.includes(path) ? 0.8 : 0.5,
        alternates: { languages },
      });
    }
  }

  return entries;
}
