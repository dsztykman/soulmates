import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AboutHero } from "./AboutHero";
import { AboutContent } from "./AboutContent";
import { CTA } from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutContent />
      <CTA />
    </>
  );
}
