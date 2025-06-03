"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="wu-j5f2">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="u3ojkfl">
            <div className="grid gap-1" data-oid="61b_6q3">
              {title && <ToastTitle data-oid="0z96w1r">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="lexsm79">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="7f9e3yw" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="priejpi" />
    </ToastProvider>
  );
}
