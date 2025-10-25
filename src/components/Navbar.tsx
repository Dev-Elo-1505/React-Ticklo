import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

const Navbar = () => {
  return (
    <nav className="relative z-10 flex justify-between items-center font-inter">
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
