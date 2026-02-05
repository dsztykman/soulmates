"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { navVariants } from "@/lib/animations";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/services", labelKey: "services" },
  { href: "/about", labelKey: "about" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Header() {
  const t = useTranslations("common.navigation");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo-golden.png"
                alt="Soulmates"
                width={200}
                height={67}
                className="h-16 sm:h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 relative",
                      isActive
                        ? "text-[#CCB380]"
                        : "text-[#A1A1A1] hover:text-[#FAFAFA]"
                    )}
                  >
                    {t(link.labelKey)}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#CCB380]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/contact" className="hidden sm:block">
                <Button size="sm">{t("contact")}</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#FAFAFA] hover:text-[#CCB380] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-[#0A0A0A] border-l border-[#252525] pt-20 px-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "py-3 text-lg font-medium border-b border-[#252525] transition-colors",
                        isActive
                          ? "text-[#CCB380] border-[#CCB380]"
                          : "text-[#FAFAFA] hover:text-[#CCB380]"
                      )}
                    >
                      {t(link.labelKey)}
                    </Link>
                  );
                })}
                <Link href="/contact" className="mt-4">
                  <Button className="w-full">{t("contact")}</Button>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
