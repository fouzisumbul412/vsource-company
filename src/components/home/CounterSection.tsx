import React, { useState, useEffect, useRef } from 'react';
import AnimateOnScroll from '../AnimateOnScroll';

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: '+',
      label: 'Students Enrolled',
      icon: 'https://cdn-icons-gif.flaticon.com/6454/6454106.gif',
    },
    {
      id: 2,
      value: 20,
      suffix: '+',
      label: 'Years of Proven Success',
      icon: 'https://cdn-icons-gif.flaticon.com/15370/15370761.gif',
    },
    {
      id: 3,
      value: 10,
      suffix: '+',
      label: 'Global Recognized Study Destinations',
      icon: 'https://cdn-icons-gif.flaticon.com/15747/15747340.gif',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);

    return count;
  };

  return (
    <section ref={sectionRef} className=" bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
          {stats.map((stat) => {
            const count = useCounter(stat.value);

            return (
              <AnimateOnScroll key={stat.id} delay={stat.id * 100}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {/* <img
                      src={stat.icon}
                      alt={stat.label}
                      className="w-12 h-12 md:w-16 md:h-16 pointer-events-none"
                    /> */}
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                    {count}
                    {stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;