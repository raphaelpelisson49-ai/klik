import type { Metadata } from "next";
import { Instrument_Sans, Lora } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, HTML_LANG, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { MotionLayer } from "@/components/MotionLayer";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const grotesk = Instrument_Sans({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: "variable",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  // Verificación de Search Console por etiqueta meta: basta con poner el código que da
  // Google en la variable de entorno NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Vercel).
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata({
      locale,
      route: "",
      title: dict.meta.title,
      description: dict.meta.description,
    }),
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${lora.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <OrganizationSchema locale={locale} />
        {/* Sin JavaScript, los bloques que aparecen al hacer scroll se muestran tal cual */}
        <noscript>
          <style>{".klik-reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <MotionLayer />
        {children}
        <Analytics locale={locale} />
      </body>
    </html>
  );
}
