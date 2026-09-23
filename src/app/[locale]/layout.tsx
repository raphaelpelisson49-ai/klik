import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, HTML_LANG, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata({
      locale,
      path: "",
      title: dict.meta.title,
      description: dict.meta.description,
    }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${lora.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <OrganizationSchema locale={locale} />
        {children}
      </body>
    </html>
  );
}
