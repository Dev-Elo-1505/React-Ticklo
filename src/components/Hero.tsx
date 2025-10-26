import Navbar from "./Navbar";
import ButtonLink from "./ButtonLink";
import wave from "../assets/wave.svg";

const Hero = () => {
  return (
    <section className="relative p-4 md:px-12 md:py-6 text-white min-h-screen overflow-hidden bg-linear-to-b from-primary via-primary/90 to-white ">
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-0 w-screen h-full bg-linear-to-b from-primary via-primary/90 to-white z-0" />

      <div
        aria-hidden={true}
        className="hidden md:block absolute -top-8 right-0 translate-x-8 w-48 h-48 rounded-full bg-white/10 backdrop-blur-lg transform rotate-12 pointer-events-none z-0"
      />
      <div
        aria-hidden={true}
        className="md:hidden absolute -bottom-6 left-4 w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm pointer-events-none z-0"
      />

      <div className="relative z-10">
        <Navbar />
        <main className="flex flex-col items-center justify-center text-center min-h-[50vh] gap-4 mt-6 md:mt-0">
        <div className="text-[11px] rounded-full px-3 py-1 backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-sm">
          World no. 1 ticket platform
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold bg-linear-to-r from-white via-[#bae6fd] to-[#a5f3fc] text-transparent bg-clip-text drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
          Create Tickets! Track Tickets!
        </h1>
        <p className="text-sm w-3/4">
          Ticklo streamlines ticket management, withe <a href="https://vue-ticklo.vercel.app/" target="_blank" rel="noreferrer noopener">Vue</a> and{" "}
          <a href="">Twig</a> versions available!
        </p>
        <ButtonLink
          title="Get Started"
          location="/auth/signup"
          customClass="mb-4"
        />
      </main>
      </div>
      <img src={wave} alt="wave" className="absolute bottom-0 left-0 w-full" />
    </section>
  );
};

export default Hero;
