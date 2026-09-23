import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const tagline = t.hero.words.map((w) => w.t).join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0E0E10",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "2px solid rgba(205,176,122,0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 210,
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: "#CDB07A",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              border: "5px solid #F4F0E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              color: "#F4F0E8",
              position: "relative",
            }}
          >
            k
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 4,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#CDB07A",
                display: "flex",
              }}
            />
          </div>
          <div style={{ fontSize: 96, color: "#F4F0E8", display: "flex" }}>klik</div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 40,
            color: "#CDB07A",
            display: "flex",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
