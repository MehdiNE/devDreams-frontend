import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Label } from "./label";

const inputVariants = cva(
  "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error:
          "appearance-none border-red-500 focus:border-red-500 focus:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  asChild?: boolean;
  errorMessage?: string;
  startChildren?: React.ReactNode;
  endChildren?: React.ReactNode;
  labelColor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type,
      label,
      errorMessage,
      startChildren,
      endChildren,
      labelColor,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        {label && (
          <Label
            htmlFor={label}
            className={`mb-1.5 inline-block text-sm font-medium ${labelColor ?? "text-slate-900"}`}
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {startChildren && (
            <div className="absolute right-1 top-0 flex h-full items-center justify-center p-1">
              {startChildren}
            </div>
          )}

          <input
            id={label}
            type={type}
            className={cn(
              inputVariants({
                variant:
                  errorMessage || props?.["aria-invalid"] ? "error" : variant,
                className,
              }),
            )}
            ref={ref}
            {...props}
          />

          {endChildren && (
            <div className="absolute left-1 top-0 flex h-full items-center justify-center p-1">
              {endChildren}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="mr-0.5 mt-1.5 h-2 text-xs font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
