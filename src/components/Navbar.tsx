import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

const Navbar = () => {
  return (
    <nav className="relative z-10 flex justify-between items-center font-inter max-w-[1440px] mx-auto p-4 md:px-12 md:py-6">
      <Link to="/" className="text-xl font-bold md:text-2xl">
        Ticklo
      </Link>
      <div className="flex gap-2">
        <ButtonLink
          title="Login"
          location="/auth/login"
          customClass="bg-transparent text-white"
        />
        <ButtonLink title="Get Started" location="/auth/signup" />
      </div>
    </nav>
  );
};

export default Navbar;
