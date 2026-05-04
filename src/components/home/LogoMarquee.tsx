import React from 'react';
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

// Inject animation styles with mobile-specific speed
const style = `
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Default speed: Desktop (30s) */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

/* Faster on mobile: override animation duration */
@media (max-width: 768px) {
  .animate-marquee {
    animation-duration: 15s;
  }
  .animate-marquee-reverse {
    animation-duration: 15s;
  }
}
`;

interface MarqueeRowProps {
  logos: string[];
  reverse?: boolean;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, reverse = false }) => {
  const repeated = [...logos, ...logos, ...logos, ...logos]; // Prevent gaps

  return (
    <div className="relative overflow-hidden w-full py-2 md:py-4">
      <div
        className={`flex w-[200%] whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {repeated.map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-4 w-[140px] md:w-[180px] h-[60px] md:h-[80px] flex items-center justify-center"
          >
            <img
              src={logo}
              alt="university logo"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
              }}
            />
          </div>
        ))}
      </div>

      {/* Edge gradients for blur effect */}
      <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-white to-transparent z-10" />
    </div>
  );
};

const LogoMarquee = () => {
  const usLogos = [
    '/assets/images/logos/Manhattan_College.png',
    '/assets/images/logos/northeastern.png',
    '/assets/images/logos/st.png',
    '/assets/images/logos/Stevens.png',
    '/assets/images/logos/texas.png',
    '/assets/images/logos/ucm.png',
    '/assets/images/logos/UMass_Boston.png',
    '/assets/images/logos/umassd.png',
    '/assets/images/logos/University_Y.png',
    '/assets/images/logos/WRIGHTSTATE.png',
    '/assets/images/logos/virginia.png',
  ];

  const ukLogos = [
    '/assets/images/countries/ARU-logo.jpg',
    '/assets/images/countries/aston.png',
    '/assets/images/countries/bcu.jpg',
    '/assets/images/countries/Black-Logo.png',
    '/assets/images/countries/cardiff-university.png',
    '/assets/images/countries/sussex.png',
    '/assets/images/countries/coventry-university.jpg',
    '/assets/images/countries/TU.png',
    '/assets/images/countries/UON-Logo.png',
    '/assets/images/countries/university-of-warwick-warw7046.jpg',
  ];

  const btechLogos = [
    '/assets/images/logos/karnavati.png',
    '/assets/images/logos/ganapati.png',
    '/assets/images/logos/maharishi.png',
    '/assets/images/logos/presidence.png',
    '/assets/images/logos/suresh.png',
    '/assets/images/logos/VGU.png',
    '/assets/images/logos/maharishi.png',
  ];

  const mbbsLogos = [
    '/assets/images/logos/CIU.jpeg',
    '/assets/images/logos/ILIA.jpeg',
    '/assets/images/logos/KWIU.jpeg',
    '/assets/images/logos/gerogia.jpeg',
    '/assets/images/logos/CIU.jpeg',
    '/assets/images/logos/ILIA.jpeg',
  ];

  return (
    <>
      <style>{style}</style>

      <section className="py-10 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our University Partners"
            subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
          />

          <AnimateOnScroll>
            <div className="mt-6 md:mt-10 relative overflow-hidden px-2 md:px-4 space-y-4">
              <MarqueeRow logos={usLogos} />
              <MarqueeRow logos={ukLogos} reverse />
              <MarqueeRow logos={btechLogos} />
              <MarqueeRow logos={mbbsLogos} reverse />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="mt-8 md:mt-12 text-center">
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Our strong partnerships with these universities ensure that our students receive
                preferential admissions consideration, specialized programs, and exclusive scholarship opportunities.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default LogoMarquee;
