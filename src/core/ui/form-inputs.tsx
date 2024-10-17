import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const TextInput = forwardRef<
  HTMLInputElement | null,
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        "border-4 border-black bg-white/50 rounded-[10px] text-black text-[24px] outline-none p-2 w-full",
        className
      )}
    />
  );
});

TextInput.displayName = "TextInput";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "size" | "color"> {
  options: SelectOption[];
}

export const SelectInput = forwardRef<HTMLSelectElement | null, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref}
        className={twMerge(
          "border-4 border-black bg-white/50 rounded-[10px] text-black text-[24px] outline-none p-2 w-full",
          className
        )}
      >
        {options.map((option: SelectOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SelectInput.displayName = "SelectInput";
