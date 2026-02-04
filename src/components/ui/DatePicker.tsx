"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  minDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  placeholder = "Select a date",
  minDate = new Date(),
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const dateLocale = locale === "fr" ? frCA : enCA;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    if (date) {
      setIsOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "PPP", { locale: dateLocale });
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-left",
            "bg-[#1A1A1A] border border-[#252525]",
            "text-[#FAFAFA]",
            "focus:outline-none focus:border-[#5B2D8A] focus:ring-1 focus:ring-[#5B2D8A]",
            "transition-colors duration-300",
            "flex items-center justify-between",
            !value && "text-[#6B6B6B]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
        >
          <span>{value ? formatDate(value) : placeholder}</span>
          <Calendar size={20} className="text-[#5B2D8A]" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-2 left-0 right-0"
            >
              <div className="bg-[#1A1A1A] border border-[#252525] rounded-2xl shadow-2xl overflow-hidden">
                <DayPicker
                  mode="single"
                  selected={value}
                  onSelect={handleSelect}
                  locale={dateLocale}
                  disabled={{ before: minDate }}
                  showOutsideDays
                  classNames={{
                    root: "p-4",
                    months: "flex flex-col",
                    month: "space-y-4",
                    month_caption: "flex justify-center pt-1 relative items-center mb-4",
                    caption_label: "text-lg font-semibold text-[#FAFAFA] ",
                    nav: "flex items-center gap-1",
                    button_previous: "absolute left-1 top-0 p-2 rounded-lg hover:bg-[#252525] text-[#A1A1A1] hover:text-[#5B2D8A] transition-colors",
                    button_next: "absolute right-1 top-0 p-2 rounded-lg hover:bg-[#252525] text-[#A1A1A1] hover:text-[#5B2D8A] transition-colors",
                    weekdays: "flex",
                    weekday: "text-[#6B6B6B] w-10 font-medium text-sm text-center",
                    week: "flex mt-2",
                    day: "p-0 text-center",
                    day_button: cn(
                      "w-10 h-10 rounded-lg font-medium transition-all duration-200",
                      "hover:bg-[#252525] hover:text-[#5B2D8A]",
                      "focus:outline-none focus:ring-2 focus:ring-[#5B2D8A] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
                    ),
                    selected: "!bg-[#5B2D8A] !text-[#0A0A0A] hover:!bg-[#7B4DAA] font-bold",
                    today: "text-[#5B2D8A] font-bold",
                    outside: "text-[#3A3A3A] hover:text-[#6B6B6B]",
                    disabled: "text-[#3A3A3A] cursor-not-allowed hover:bg-transparent hover:text-[#3A3A3A]",
                  }}
                  components={{
                    Chevron: ({ orientation }) =>
                      orientation === "left" ? (
                        <ChevronLeft size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      ),
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
