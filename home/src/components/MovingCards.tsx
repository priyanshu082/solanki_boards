"use client";

import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import partnerLogo1 from "../assets/images/patner_logo_1.jpeg";
import partnerLogo2 from "../assets/images/patner_logo_2.jpeg";
import partnerLogo3 from "../assets/images/patner_logo_3.jpeg";
import partnerLogo4 from "../assets/images/patner_logo_4.jpeg";
import partnerLogo5 from "../assets/images/patner_logo_5.jpeg";
import partnerLogo6 from "../assets/images/patner_logo_6.jpeg";
import partnerLogo7 from "../assets/images/patner_logo_7.jpeg";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden pt-8">
        <div className="text-2xl font-bold tracking-tight text-primary mb-4">
            OUR PATNERS
        </div>
      <InfiniteMovingCards
        items={partnerLogos}
        direction="right"
        
        speed="slow"
      />
    </div>
  );
}

const partnerLogos = [
  { imageUrl: partnerLogo1 },
  { imageUrl: partnerLogo2 },
  { imageUrl: partnerLogo3 },
  { imageUrl: partnerLogo4 },
  { imageUrl: partnerLogo5 },
  { imageUrl: partnerLogo6 },
  { imageUrl: partnerLogo7 },
];
