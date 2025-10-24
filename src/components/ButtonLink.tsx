import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

type ButtonType = "button" | "submit" | "reset";

interface ButtonLinkProps {
  title: string;
  type?: ButtonType;
  customClass?: string;
  location: string;
}

const ButtonLink = ({
  title,
  type,
  customClass,
  location,
}: ButtonLinkProps) => {
  return (
    <Link
      to={location}
      className={cn(
        `bg-white text-primary p-2 rounded-full text-sm hover:opacity-90 active:scale-95 ${customClass}`
      )}
      type={type}
    >
      {title}
    </Link>
  );
};

export default ButtonLink;
