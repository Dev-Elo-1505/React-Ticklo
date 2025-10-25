import { Link } from "react-router-dom";
import Button from "./Button";

interface AppNavbarProps {
  onLogout?: () => void;

  isLoading?: boolean;

  title?: string;
}

const AppNavbar = ({
  onLogout,
  isLoading = false,
  title = "Ticklo",
}: AppNavbarProps) => {
  return (
    <nav className="flex justify-between items-center font-inter">
      <Link to="/" className="text-xl font-bold md:text-2xl text-primary">
        {title}
      </Link>

        <Button
          title="Log out"
          customClass="bg-red-500 rounded-md w-20 md:w-32"
          onClick={onLogout}
          disabled={isLoading}
        />
      
    </nav>
  );
};

export default AppNavbar;
