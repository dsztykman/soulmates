import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.gallery" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryContent />;
}
