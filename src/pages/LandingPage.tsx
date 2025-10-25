import Features from "../components/Features";
import Hero from "../components/Hero";
import Stats from "../components/Stats";

const LandingPage = () => {
  return (
    <div className="font-inter">
      <Hero />
      <div className="max-w-[1440px] mx-auto">
        <Features />
      <Stats />
      </div>
      
    
    </div>
  );
};

export default LandingPage;
