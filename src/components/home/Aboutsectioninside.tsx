import React, { useState, useEffect, useRef } from 'react';

const AboutSection: React.FC = () => {
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
      value: 1500,
      suffix: '+',
      label: 'Educational Programs',
      icon: 'https://cdn-icons-gif.flaticon.com/15370/15370761.gif',
    },
    {
      id: 3,
      value: 10,
      suffix: '+',
      label: 'Study Destinations',
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
      { threshold: 0.2 }
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
    <section className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="content">
          <div className="text-section">
          <h1 style={{ color: '#1e73be' }}>About Vsource Company</h1>

            <p className="subheading">
              <strong>South India's Leading Educational Group for Higher Education
              </strong>
            </p>
            <p className="paragraph">
            Proudly sending the highest number of students every year.

            </p>
            <p className="paragraph">
           <strong> 100% Educational Loan Guidance</strong> provided to support your academic journey.

            </p>

            <div className="stats">
              {stats.map((stat) => {
                const count = useCounter(stat.value);
                return (
                  <div key={stat.id} className="stat-block">
                    <img src={stat.icon} alt={stat.label} className="icon" />
                    <div className="stat-info">
                      <div className="count">{count}{stat.suffix}</div>
                      <div className="label">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <ul className="blue-dots">
  <li><strong>Master’s Programs Abroad.</strong></li>
  <li><strong>B.Tech (CSE, AI/ML, Data Science)</strong></li>
  <li><strong>MBBS Abroad</strong></li>
  <li> <strong>B.Sc Agriculture</strong></li>
  <li> <strong>Paramedical Studies</strong></li>
</ul>


           
          </div>

          <div className="image-section">
            <img src="https://vsourcevarsity.com/assets/images/founder.webp" alt="Founder" />
            <p className="caption">
              <strong style={{ fontSize: '20px' }}>“</strong>Redefining Education for Tomorrow’s Innovators<strong style={{ fontSize: '20px' }}>”</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
       .about-section {
  font-family: 'Barlow', sans-serif;
  background-color: #fff;
  color: #333;
  
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}
.blue-dots {
  list-style-type: disc; /* default bullet style */
  padding-left: 1.5rem;
}

.blue-dots li::marker {
  color: #007BFF; /* Use any shade of blue */
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.text-section {
  flex: 2;
}
.container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  
}
.image-section {
  flex: 1;
  border: 1px solid grey;
  border-radius: 15px;
  padding: 5px;
  text-align: center;
  max-width: 800px;
  margin: auto;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}

.stat-block {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
}

.stat-block .icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  
}

.count {
  font-size: 20px;
  color: #1e73be;
  font-weight: bold;
}

.label {
    font-size: 20px;
    color: #555;
    align-items: center;
    margin-left: 8px;
}

h1 {
  font-size: 29px;
  color:rgb(190, 30, 30);
  margin-top:20px;
}

.subheading {
  font-size: 20px;
  margin-bottom: 20px;
  color: black;
  margin-top: 20px;
}

.paragraph {
  font-size: 15px;
  line-height: 1.6;
  color: black;
  margin-bottom: 15px;
  margin-top:10px;
}

.caption {
  font-size: 15px;
  color: black;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .content {
    flex-direction: row;
    align-items: center;
  }
.stat-info {
    display: flex
;
    flex-direction: row !important;
}
  .stats {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .stat-block {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-info {
    align-items: center;
  }
}

      `}</style>
    </section>
  );
};

export default AboutSection;
