import { setRequestLocale } from "next-intl/server";
import { Hero, ServicesGrid, Stats, GalleryPreview, CTA } from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesGrid />
      <Stats />
      <GalleryPreview />
      <CTA />
    </>
  );
}
