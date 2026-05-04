import React from 'react';
import SectionTitle from '../SectionTitle';
import AnimateOnScroll from '../AnimateOnScroll';

const TrustSection = () => {
  const trustBadges = [
    {
      id: 1,
      name: "ISO 9001:2015 Certified",
      icon: "/assets/images/badges/iso.png",
      fallbackIcon: "🏅"
    },
    {
      id: 2,
      name: "ICEF Certified",
      icon: "/assets/images/badges/icef.png",
      fallbackIcon: "🌟"
    },
    {
      id: 3,
      name: "British Council Partner",
      icon: "/assets/images/badges/british-council.png",
      fallbackIcon: "🇬🇧"
    },
    {
      id: 4,
      name: "Ministry of Education Approved",
      icon: "/assets/images/badges/education.png",
      fallbackIcon: "📚"
    },
    {
      id: 5,
      name: "10+ Years of Excellence",
      icon: "/assets/images/badges/excellence.png",
      fallbackIcon: "🏆"
    },
    {
      id: 6,
      name: "5000+ Students Placed",
      icon: "/assets/images/badges/students.png",
      fallbackIcon: "👨‍🎓"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Trust & Credibility" 
          subtitle="We are recognized and certified by leading educational organizations worldwide" 
        />
        
        <AnimateOnScroll>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustBadges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex flex-col items-center text-center p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  {badge.icon ? (
                    <img 
                      src={badge.icon} 
                      alt={badge.name} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.fontSize = '2.5rem';
                        target.style.display = 'flex';
                        target.style.alignItems = 'center';
                        target.style.justifyContent = 'center';
                        target.outerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">${badge.fallbackIcon}</div>`;
                      }}
                    />
                  ) : (
                    <div className="text-4xl">{badge.fallbackIcon}</div>
                  )}
                </div>
                <h3 className="font-medium text-gray-800">{badge.name}</h3>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll delay={200}>
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Verified & Trusted</h3>
                <p className="text-gray-600 max-w-md">
                  Our certifications and partnerships ensure that we provide the highest quality education consultancy services.
                </p>
              </div>
              
              <button 
                className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-red-600 transition-colors"
                onClick={() => window.open('/about-us', '_self')}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TrustSection; 