import { useRef, useEffect } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

const UniversitiesSection = () => {
  const logos = ["/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png", "/lovable-uploads/b63069bf-c57d-484f-b4d1-4ab19cd03250.png"];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;
    const scrollContent = scrollElement.querySelector('.scroll-content');
    if (!scrollContent) return;

    // Clone the content for seamless looping
    scrollElement.appendChild(scrollContent.cloneNode(true));

    // Automatic scrolling animation
    let animationId: number;
    let scrollPosition = 0;
    const scroll = () => {
      if (!scrollElement) return;
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContent.clientWidth) {
        scrollPosition = 0;
      }
      scrollElement.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-2 md:py-4 bg-gray-50">
      <div className="container w-full px-4">
        <SectionTitle
          title="Our University Partners"
          subtitle="We collaborate with prestigious institutions worldwide to offer you the best educational opportunities"
        />

        <AnimateOnScroll>
          <div className="mt-4 relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-hidden whitespace-nowrap px-[39px] mx-[22px]"
            >
              <div className="scroll-content inline-block">
                {logos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="inline-block mx-6 my-4 w-32 lg:w-40 h-32 flex items-center justify-center"
                  >
                    <img
                      src={logo}
                      alt={`University Partner ${idx + 1}`}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient overlays for scrolling effect */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent"></div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent"></div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our strong partnerships with these universities ensure that our students receive
              preferential admissions consideration, specialized programs, and exclusive scholarship opportunities.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default UniversitiesSection;