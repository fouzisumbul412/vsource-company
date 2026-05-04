import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const animatedTexts = [
  ["B.Tech Admissions -2025", "in NAAC A, A+, A++ UNIVERSITIES"],
  ["STUDY MASTER'S", "IN USA, UK IRELAND, CANADA, FRANCE"],
  ["MBBS ABROAD", "IN GEORGIA , RUSSIA"],
  ["100% EDUCATION LOAN", "LOAN SANCTION WITHIN 24 hrs"],
];

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center text-white overflow-hidden pt-16 md:pt-0">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('/assets/images/display girl.jpg')" }}
      >
        <img
          src="/assets/images/display girl.jpg"
          alt="Background Fallback"
          className="hidden"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://via.placeholder.com/1920x1080?text=Student+Image';
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-darkblue/40 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* ========== Desktop ========== */}
          <div className="hidden md:block space-y-6 pt-28">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              Redefining <span className="text-red-500">Education</span> for Tomorrow's Innovators
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-xl">
              Your trusted educational consultancy with 20+ years of experience in guiding students towards successful academic and professional futures.
            </p>
            <div className="flex justify-start">
              <img
                src="/assets/images/20 years logo.png"
                alt="20 Years Logo"
                className="w-36 h-auto"
              />
            </div>
            {/* <div className="mt-4 p-5 bg-white/20 backdrop-blur-md rounded-xl max-w-2xl w-full text-white min-h-[90px] flex flex-col justify-center">
              {animatedTexts[currentTextIndex].map((line, i) => (
                <p key={i} className="text-lg font-semibold leading-tight animate-fade-in transition-opacity duration-500 ease-in-out">
                  {line}
                </p>
              ))}
            </div> */}
            <div className="pt-6 pb-20">
              <p className="text-sm text-gray-400 mb-2">Trusted by students across the globe</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      "/assets/images/ANINASH YADAV  (UK).jpeg",
                      "/assets/images/DAKANNAGARI ROHITH REDDY  (USA).jpeg",
                      "/assets/images/SRAVYA SREE BUSSU (USA).jpeg",
                      "/assets/images/SOUMYA GOPAGONI (UK).jpeg"
                    ].map((image, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-darkblue overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Student ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://ui-avatars.com/api/?name=Student+${i + 1}&background=random`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-sm">+100,000 students</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-base">★★★★★</span>
                  <span className="text-sm">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== Mobile ========== */}
          <div className="md:hidden flex flex-col items-start pt-[150px] px-4 space-y-4">
            <h1 className="text-[29px] sm:text-[30px] font-bold leading-tight text-white">
              Redefining <span className="text-red-500">Education</span> for Tomorrow's Innovators
            </h1>
          
          </div>
          
        </div>
      </div>

     {/* Course Card - Without Images */}
<div className="absolute bottom-0 left-0 w-full z-30">
  <div className="bg-orange-500 text-white shadow-lg py-2 text-center text-sm md:text-lg font-semibold uppercase tracking-wide">
    B.TECH &nbsp;|&nbsp; MASTER'S &nbsp;|&nbsp; MBBS ABROAD &nbsp;|&nbsp; EDUCATION LOAN
  </div>
</div>
                 


      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      <style>{`
        

.text-\[31px\] {
    font-size: 29px;
}
 .pt-\[16px\] {
    padding-top: 200px !important;
}`}</style>
    </section>
  );
};

export default Hero;
