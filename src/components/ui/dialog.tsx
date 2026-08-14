"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogBackdrop = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Backdrop>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogBackdrop.displayName = "DialogBackdrop";

const DialogViewport = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-full max-w-140 -translate-x-1/2 -translate-y-1/2 justify-center p-4",
      className
    )}
    {...props}
  />
));
DialogViewport.displayName = "DialogViewport";

const DialogPopup = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Popup
    ref={ref}
    className={cn(
      "relative z-50 w-full overflow-y-auto rounded-xl border border-border-default bg-bg-base p-6 shadow-xl",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className
    )}
    {...props}
  />
));
DialogPopup.displayName = "DialogPopup";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-heading text-lg font-bold text-white", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-text-faint text-sm font-body mt-1", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

function DialogContent({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup className={className}>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogClose
              className="rounded-lg p-1.5 text-text-muted hover:bg-muted hover:text-white focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
          <div className="mt-4">{children}</div>
        </DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  DialogContent,
};
