"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "fr") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-[#1A1A1A] rounded-full p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
            locale === loc
              ? "bg-[#CCB380] text-[#0A0A0A]"
              : "text-[#A1A1A1] hover:text-[#FAFAFA]"
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
