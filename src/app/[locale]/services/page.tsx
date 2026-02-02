import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ServicesGrid } from "@/components/sections";
import { ServiceHero } from "./ServiceHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServiceHero type="overview" />
      <ServicesGrid />
    </>
  );
}
