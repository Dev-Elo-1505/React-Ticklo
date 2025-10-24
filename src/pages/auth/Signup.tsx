import { Link, useNavigate } from "react-router-dom";
import auth from "../../assets/auth.svg?raw";
import Button from "../../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type AuthForm, authSchema } from "../../types";
import { signup as signupRequest } from "../../utils/auth";
import { useToast } from "../../components/Toast";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });

  const handleSignup = async (data: AuthForm) => {
    try {
      await signupRequest(data);
      toast.showToast("Account created — signed in", "success");
      reset();
      navigate("/dashboard");
    } catch (error: any) {
      toast.showToast(error?.message ?? "Signup failed", "error");
    }
  };

  return (
    <section className="p-6 md:p-12 font-inter">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <Link to="/" className="text-2xl font-bold text-primary">
            Ticklo
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full max-w-md mx-auto">
            <h1 className="font-semibold text-2xl mb-2">Get Started</h1>
            <p className="text-sm text-gray-primary mb-4">
              Welcome to Ticklo — create your account to get started.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                title="Create account"
                onClick={() => {}}
                disabled={isSubmitting}
              />

              <p className="text-center text-sm text-gray-primary">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary">
                  Log in
                </Link>
              </p>
            </form>
          </div>

          <div
            className="hidden md:flex items-center justify-center rounded-md"
            style={{
              backgroundColor: "var(--color-primary,#5bb0fe)",
              minHeight: "80vh",
            }}
          >
            <div className="w-full max-w-md p-8">
              {/* inline SVG so we can recolor and make it responsive */}
              <div
                aria-hidden={true}
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    const raw = auth ?? "";
                    // replace the illustration's purple with the app primary variable (with a fallback)
                    const withPrimary = raw.replace(
                      /#6c63ff/gi,
                      "var(--color-primary,#5bb0fe)"
                    );
                    // remove fixed width/height on svg and make it responsive
                    return withPrimary.replace(/<svg([^>]*)>/i, (_m, attrs) => {
                      const cleaned = attrs.replace(
                        /\s(width|height)="[^"]*"/gi,
                        ""
                      );
                      return (
                        `<svg${cleaned} style="width:100%;height:auto;display:block;"` +
                        `>`
                      );
                    });
                  })(),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
