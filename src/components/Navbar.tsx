import { Link } from "react-router-dom"
import Button from "./ButtonLink"
import ButtonLink from "./ButtonLink"


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center font-inter">
        <h1 className="text-xl font-bold">Ticklo</h1>
        <div className="flex gap-2">
          <ButtonLink title="Login" location="/auth/login" customClass="bg-transparent text-white" />
          <ButtonLink title="Get Started" location="/auth/signup" />
        </div>
      </nav>
  )
}

export default Navbar