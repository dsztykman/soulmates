"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#FAFAFA] mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl",
            "bg-[#1A1A1A] border border-[#252525]",
            "text-[#FAFAFA] placeholder:text-[#6B6B6B]",
            "focus:outline-none focus:border-[#CCB380] focus:ring-1 focus:ring-[#CCB380]",
            "transition-colors duration-300",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#FAFAFA] mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl min-h-[120px] resize-y",
            "bg-[#1A1A1A] border border-[#252525]",
            "text-[#FAFAFA] placeholder:text-[#6B6B6B]",
            "focus:outline-none focus:border-[#CCB380] focus:ring-1 focus:ring-[#CCB380]",
            "transition-colors duration-300",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#FAFAFA] mb-2"
          >
            {label}
          </label>
        )}
        <select
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl appearance-none",
            "bg-[#1A1A1A] border border-[#252525]",
            "text-[#FAFAFA]",
            "focus:outline-none focus:border-[#CCB380] focus:ring-1 focus:ring-[#CCB380]",
            "transition-colors duration-300",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C9A962%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-[#6B6B6B]">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
