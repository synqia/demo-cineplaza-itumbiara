"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPortal,
  DialogPopup,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface TrailerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trailerUrl: string;
}

export default function TrailerDialog({
  open,
  onOpenChange,
  title,
  trailerUrl,
}: TrailerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport className="max-w-225">
          <DialogPopup className="border-border bg-surface p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <DialogTitle className="text-foreground">
                Trailer — {title}
              </DialogTitle>
              <DialogClose
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Fechar trailer"
              >
                <X className="h-5 w-5" />
              </DialogClose>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              {open ? (
                <iframe
                  src={`${trailerUrl}${trailerUrl.includes("?") ? "&" : "?"}autoplay=0`}
                  title={`Trailer de ${title}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              URL de demonstração — substituível na integração final.
            </p>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
