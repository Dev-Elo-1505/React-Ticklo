import { useEffect, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const Modal = ({
  isOpen,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}: ModalProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCancel?.();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      // focus cancel button for accessibility
      setTimeout(() => cancelRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6"
      >
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {description && (
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </div>
        )}
        {children}

        <div className="mt-4 flex gap-3">
          <Button
            title={cancelText}
            customClass="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onCancel}
            ref={cancelRef}
          />

          <Button
            title={confirmText}
            customClass="px-4 py-2 rounded-md bg-red-500 text-white hover:opacity-95 disabled:opacity-50"
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
