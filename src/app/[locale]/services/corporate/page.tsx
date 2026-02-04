import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ServiceHero } from "../ServiceHero";
import { ServiceDetail } from "../ServiceDetail";
import { ClientLogos, CTA } from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.corporate" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CorporatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServiceHero type="corporate" />
      <ServiceDetail type="corporate" />
      <ClientLogos />
      <CTA />
    </>
  );
}
