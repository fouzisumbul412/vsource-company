import Counter from "../Counter";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  const stats = [
    {
      count: 200,
      title: "Courses",
      subtitle: "Find the perfect course tailored to your career goals",
      image: "/assets/images/universities/courses-.jpg",
      alt: "Course documents",
    },
    {
      count: 10,
      title: "Study Destinations",
      subtitle: "Learn from top professionals in the industry",
      image: "/assets/images/universities/study destinations.jpg",
      alt: "Study destinations",
    },
    {
      count: 500,
      title: "Career Experts",
      subtitle: "Get personalized advice to shape your career path",
      image: "/assets/images/universities/career experts-.jpg",
      alt: "Career experts",
    },
    {
      count: 100000,
      title: "Enrolled Students",
      subtitle: "Trusted by students across the globe",
      image: "/assets/images/universities/enrolled students.jpg",
      alt: "Enrolled students",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Empowering Learners Through Experience"
          subtitle="Years of experience and expert knowledge to guide your journey"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white border border-red-300 hover:border-red-500 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-red-600">
                  {stat.count}
                  <span className="text-yellow-500">+</span>
                </div>
                <h3 className="text-xl mt-2 font-semibold">{stat.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{stat.subtitle}</p>
                <div className="mt-6">
                  <img
                    src={stat.image}
                    alt={stat.alt}
                    className="h-28 w-full max-w-[140px] mx-auto object-contain"
                  />
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
