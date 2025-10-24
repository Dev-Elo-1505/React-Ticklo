import { cn } from "../lib/utils";
import type { ButtonType } from "../types";

interface ButtonProps {
  title: string;
  type?: ButtonType;
  customClass?: string;
  onClick?: () => void;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({ title, type, customClass, onClick, disabled, ref }: ButtonProps) => {
  return (
    <button
      className={cn(
        `bg-primary text-white w-full p-2 rounded-full text-sm md:text-md hover:opacity-90 active:scale-95 cursor-pointer ${customClass}`
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
        ref={ref}
    >
      {title}
    </button>
  );
};

export default Button;
