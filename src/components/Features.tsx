import FeatureCard, { features } from "./FeatureCard";


const Features = () => {
  return (
    <section className="p-4 min-h-screen md:px-12 md:py-6">
      <div className="text-md rounded-full px-3 py-1 backdrop-blur-md border border-white/30 text-primary text-center shadow-sm w-32 bg-primaryLight mx-auto">
        Our Features
      </div>
      <div className="text-center mt-4 text-2xl font-semibold w-3/4 md:w-80 mx-auto">
        <p>makes it easy to create and track tickets</p>
      </div>
      <div className="mt-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature}  />
        ))}
      </div>
    </section>
  );
};

export default Features;
