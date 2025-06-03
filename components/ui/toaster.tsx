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
    <ToastProvider data-oid="346-7le">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="xrjczt6">
            <div className="grid gap-1" data-oid="amevjoy">
              {title && <ToastTitle data-oid="fqf7fr7">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="gygu21q">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="3r.40kw" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="athvzzt" />
    </ToastProvider>
  );
}
