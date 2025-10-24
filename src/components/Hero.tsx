import Navbar from "./Navbar";
import ButtonLink from "./ButtonLink";

const Hero = () => {
  return (
    <section className="p-4 bg-primary text-white">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center min-h-[80vh] gap-4">
        <div className="text-[11px] rounded-full px-3 py-1 backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-sm">
          World no. 1 ticket platform
        </div>

        <h1 className="text-5xl font-semibold bg-linear-to-r from-white via-[#bae6fd] to-[#a5f3fc] text-transparent bg-clip-text drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
          Create Tickets! Track Tickets!
        </h1>
        <p className="text-sm w-3/4">
          Ticklo streamlines ticket management, withe <a href="">Vue</a> and{" "}
          <a href="">Twig</a> versions available!
        </p>
        <ButtonLink title="Get Started" location="/auth/signup" />
      </main>
    </section>
  );
};

export default Hero;
