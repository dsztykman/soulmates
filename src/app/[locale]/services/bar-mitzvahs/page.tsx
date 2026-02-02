import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ServiceHero } from "../ServiceHero";
import { ServiceDetail } from "../ServiceDetail";
import { CTA } from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.barMitzvahs" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BarMitzvahsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServiceHero type="barMitzvahs" />
      <ServiceDetail type="barMitzvahs" />
      <CTA />
    </>
  );
}
