"use client";

import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#FFFFFF] group-[.toaster]:text-[#111111] group-[.toaster]:border-[#E4DFD5] group-[.toaster]:shadow-lg group-[.toaster]:rounded-none group-[.toaster]:p-4 group-[.toaster]:font-body group-[.toaster]:border",
          description: "group-[.toast]:text-[#8A857C] text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-[#111111] group-[.toast]:text-[#F7F4EE] group-[.toast]:rounded-none text-xs uppercase tracking-wider",
          cancelButton:
            "group-[.toast]:bg-[#F7F4EE] group-[.toast]:text-[#111111] group-[.toast]:rounded-none text-xs uppercase tracking-wider",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
