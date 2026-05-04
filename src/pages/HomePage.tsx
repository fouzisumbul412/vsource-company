import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import AccreditationSection from "../components/home/AccreditationSection";
import StudyAbroadSection from "../components/home/StudyAbroadSection";
import ServicesSection from "../components/home/ServicesSection";
import VideoSection from "../components/home/VideoSection";
import CoursesSection from "../components/home/CoursesSection";
import LogoMarquee from "../components/home/LogoMarquee";
import ScholarshipsSection from "../components/home/ScholarshipsSection";
import ExperienceSection from "../components/home/ExperienceSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FaqSection from "../components/home/FaqSection";
// import CtaSection from "../components/home/CtaSection";
// import TrustSection from "../components/home/TrustSection";
import CounterSection from "../components/home/CounterSection";
import { useEffect } from "react";

interface HomePageProps {
  faqRef?: React.RefObject<HTMLDivElement>;
}

const HomePage = ({ faqRef }: HomePageProps) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <AboutSection />
      {/* <TrustSection /> */}
      {/* <CounterSection /> */}
      <AccreditationSection />
     
      <ServicesSection />
      <VideoSection />
      <CoursesSection />
      <LogoMarquee />
      <ScholarshipsSection />
      <StudyAbroadSection />
      {/* <ExperienceSection /> */}
      <TestimonialsSection />
      {/* <FaqSection ref={faqRef} /> */}
      {/* <CtaSection /> */}
    </>
  );
};

export default HomePage;
