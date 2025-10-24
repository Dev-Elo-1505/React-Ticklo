import { cn } from "../lib/utils";
import type { ButtonType } from "../types";

interface ButtonProps {
  title: string;
  type?: ButtonType;
  customClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ title, type, customClass, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={cn(
        `bg-primary text-white w-full p-2 rounded-full text-sm md:text-md hover:opacity-90 active:scale-95 ${customClass}`
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
