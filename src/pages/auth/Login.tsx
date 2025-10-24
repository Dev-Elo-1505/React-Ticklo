import { LuEye, LuEyeClosed } from "react-icons/lu";
import Button from "../../components/ButtonLink";
import { useState } from "react";

const Login = () => {
const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="p-4 flex flex-col  items-center justify-center min-h-screen font-inter bg-bgPrimary text-textPrimary">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full h-10 px-2 py-1.5 border  rounded mb-3 outline-0 focus:outline-1 focus:outline-dark text-sm"
              aria-label="Email"
            />
            
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              
              name="password"
              placeholder="Enter your password"
              className="w-full h-10 px-2 py-1.5 border border-greyscale rounded mb-3 outline-0 focus:outline-1 focus:outline-dark text-sm pr-10"
              aria-label="Password"
            />
            <div
              className="absolute top-3/5 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <LuEyeClosed className="text-xl text-greyscale" />
              ) : (
                <LuEye className="text-xl text-greyscale" />
              )}
            </div>
            
          </div>

          {/* <Button type="submit" title="Log In" onClick={()=> {}} /> */}
          
          
          
        </form>
    </section>
  );
};

export default Login;
