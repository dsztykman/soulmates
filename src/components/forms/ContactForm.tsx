"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  company: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.date({ message: "Please select a date" }),
  guestCount: z.string().min(1, "Please provide guest count"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0), // Spam prevention
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const eventTypeOptions = [
    { value: "corporate", label: t("eventTypes.corporate") },
    { value: "barMitzvah", label: t("eventTypes.barMitzvah") },
    { value: "private", label: t("eventTypes.private") },
    { value: "other", label: t("eventTypes.other") },
  ];

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      return;
    }

    setStatus("loading");

    try {
      // Convert date to ISO string for API
      const formData = {
        ...data,
        eventDate: format(data.eventDate, "yyyy-MM-dd"),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      reset();

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="name"
          label={t("name")}
          placeholder={t("namePlaceholder")}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          type="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="phone"
          type="tel"
          label={t("phone")}
          placeholder={t("phonePlaceholder")}
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="company"
          label={t("company")}
          placeholder={t("companyPlaceholder")}
          error={errors.company?.message}
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select
          id="eventType"
          label={t("eventType")}
          placeholder={t("eventTypePlaceholder")}
          options={eventTypeOptions}
          error={errors.eventType?.message}
          {...register("eventType")}
        />
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label={t("eventDate")}
              value={field.value}
              onChange={field.onChange}
              placeholder={t("eventDatePlaceholder")}
              error={errors.eventDate?.message}
              minDate={new Date()}
            />
          )}
        />
      </div>

      <Input
        id="guestCount"
        type="number"
        label={t("guestCount")}
        placeholder={t("guestCountPlaceholder")}
        error={errors.guestCount?.message}
        {...register("guestCount")}
      />

      <Textarea
        id="message"
        label={t("message")}
        placeholder={t("messagePlaceholder")}
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          type="submit"
          size="lg"
          isLoading={status === "loading"}
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading" ? (
            t("submitting")
          ) : (
            <>
              {t("submit")}
              <Send size={18} className="ml-2" />
            </>
          )}
        </Button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 text-green-500"
            >
              <CheckCircle size={20} />
              <span className="text-sm">{t("success")}</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 text-red-500"
            >
              <AlertCircle size={20} />
              <span className="text-sm">{t("error")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
