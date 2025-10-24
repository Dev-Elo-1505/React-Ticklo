import type { Feature } from "../types";

import easy from "../assets/easy.svg?raw";
import tracking from "../assets/tracking.svg?raw";
import dashboard from "../assets/dashboard.svg?raw";
import framework from "../assets/framework.svg?raw";

export const features: Feature[] = [
  {
    id: 1,
    title: "Easy Ticket Creation",
    description:
      "Log new issues or requests in seconds with our intuitive form and instant validation.",

    image: easy,
  },
  {
    id: 2,
    title: "Real-Time Status Tracking",
    description:
      "Stay updated as tickets move from Open to In Progress to Closed effortlessly.",
    image: tracking,
  },
  {
    id: 3,
    title: "Powerful Dashboard",
    description:
      "Monitor total, open, and resolved tickets in a clean and interactive dashboard view.",
    image: dashboard,
  },
  {
    id: 4,
    title: "Multi-Framework",
    description:
      "Explore our versatile ticketing system in React, Vue, and Twig versions.",
    image: framework,
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-6 shadow flex flex-col md:flex-row items-center md:justify-between gap-4">
      <div className="w-20 h-20 md:w-32 md:h-32 shrink-0">
        {/* make inline SVG responsive: remove hardcoded width/height and force 100% sizing */}
        <div
          className="w-full h-full"
          aria-hidden={true}
          dangerouslySetInnerHTML={{
            __html: (() => {
              const raw = (feature.image ?? "").replace(
                /#6c63ff/gi,
                "var(--color-primary)"
              );
              // remove width/height attributes from the svg tag and add responsive style
              return raw.replace(/<svg([^>]*)>/i, (_match, attrs) => {
                const cleaned = attrs.replace(/\s(width|height)="[^"]*"/gi, "");
                return `<svg${cleaned} style="width:100%;height:100%;max-width:100%;display:block">`;
              });
            })(),
          }}
        />
      </div>
      <div className="text-center md:text-left md:w-1/2">
        <span className="bg-primary text-white font-semibold md:text-xl">{feature.title}</span>
        <p className="text-gray-primary text-sm mt-2 md:text-md">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
