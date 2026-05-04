import React, { useState } from 'react';

const StudyAbroadSection = () => {
  const cards = [
    {
      title: "Get Dedicated Counsellor",
      description:
        "One-on-one support with a dedicated counsellor — guiding your success, every step of the way throughout your educational journey.",
      color: "#ca90ff",
      image: "https://www.gouk.in/v1.0.1/assets/home-best-university-two.png",
    },
    {
      title: "Study in Top 1% Universities",
      description:
        "Choosing the right university matters — we assist you in selecting the ideal institution that aligns with your academic ambitions and personal preferences.",
      color: "#d4f879",
      image: "https://www.gouk.in/v1.0.1/assets/home-best-university.png",
    },
    {
      title: "Loan assistance",
      description:
        "We provide sanction letter within 24–48 hrs with 100% education loan assistance.",
      color: "#ff7c77",
      image: "https://www.gouk.in/v1.0.1/assets/home-best-university-one.png",
    },
  ];

  const countries = [
    "UNITED STATES OF AMERICA",
    "UNITED KINGDOM",
    "CANADA",
    "GERMANY",
    // "AUSTRALIA",
    "IRELAND",
    "FRANCE",
    // "NEW ZEALAND",
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleActivate = (index: number) => setActiveCard(index);
  const handleDeactivate = () => setActiveCard(null);

  const handleRequestCallback = () => {
    const event = new CustomEvent('showCallbackPopup', {
      detail: { selectedOption: "Masters in abroad" },
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <style jsx>{`
        @keyframes scrollLoop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          overflow: hidden;
          width: 100%;
        
          padding: 1rem 0;
          position: relative;
        }

        .scrolling-text {
          display: flex;
          white-space: nowrap;
          animation: scrollLoop 60s linear infinite;
          width: max-content;
        }

        @media (max-width: 768px) {
          .scrolling-text {
            animation-duration: 45s;
          }
          .scroll-text-group {
            gap: 2rem;
            padding-right: 2rem;
          }
        }

        .scroll-text-group {
          display: flex;
          gap: 3rem;
          padding-left: 1rem;
          padding-right: 3rem;
        }

        .scroll-item {
          font-family: 'Chicago', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
          font-weight: normal;
          color: transparent;
          font-size: 3rem;
          white-space: nowrap;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          -webkit-text-stroke: 2px #4a90a4;
          text-stroke: 2px #4a90a4;
          text-shadow: none;
        }

        @media (min-width: 1024px) {
          .scroll-item {
            font-size: 5rem;
            letter-spacing: 0.25em;
            -webkit-text-stroke: 3px #4a90a4;
            text-stroke: 3px #4a90a4;
          }
          .scrolling-text {
            animation-duration: 60s;
          }
          .scroll-text-group {
            gap: 3rem;
            padding-right: 3rem;
          }
        }
      `}</style>

      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Study Abroad Opportunities
            </h2>
          </div>

          {/* Marquee */}
          <div className="marquee-container">
            <div className="scrolling-text">
              <div className="scroll-text-group">
                {countries.map((country, idx) => (
                  <span className="scroll-item" key={idx}>
                    {country},
                  </span>
                ))}
              </div>
              <div className="scroll-text-group" aria-hidden="true">
                {countries.map((country, idx) => (
                  <span className="scroll-item" key={`duplicate-${idx}`}>
                    {country},
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {cards.map((card, index) => {
              const isActive = activeCard === index;
              return (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden transition-all duration-500 cursor-pointer relative ${
                    isActive ? 'shadow-2xl scale-105' : 'shadow-md'
                  }`}
                  style={{ backgroundColor: card.color }}
                  onMouseEnter={() => handleActivate(index)}
                  onMouseLeave={handleDeactivate}
                  onTouchStart={() => handleActivate(index)}
                >
                  <div className="flex flex-col items-start text-left px-6 py-6">
                    {/* Image */}
                    <div className="w-full max-h-48 mb-4 flex items-center justify-center">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-36 sm:h-40 md:h-48 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://via.placeholder.com/150?text=Student+Image';
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Description + Button */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isActive ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm text-gray-800 mb-4 line-clamp-4">
                        {card.description}
                      </p>
                      <button
                        onClick={handleRequestCallback}
                        className="inline-block py-2 px-4 bg-gray-800 text-white text-sm font-medium rounded transition-all duration-300 hover:bg-gray-700"
                      >
                        Request callback
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default StudyAbroadSection;