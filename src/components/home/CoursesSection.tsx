import { useState, useEffect, useRef } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

type CourseItem = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  url: string;
};

const ADMIN_BASE_URL = "/admin";

const fallbackImage =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

const defaultCourses: CourseItem[] = [
  {
    title: "B.TECH - CSE (AI)",
    description:
      "Explore the future with AI-focused CSE. Learn neural networks, NLP, and intelligent systems.",
    image:
      "https://s7d9.scene7.com/is/image/shrm/AI?qlt=82&wid=576&ts=1745251212470&dpr=on,2.625",
    url: "https://vsourcevarsity.com/",
  },
  {
    title: "B.TECH - CSE (ML)",
    description:
      "Master Machine Learning concepts like predictive analytics, deep learning, and automation.",
    image:
      "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2024/07/what-is-machine-learning.jpg",
    url: "https://vsourcevarsity.com/",
  },
  {
    title: "MBBS in Georgia",
    description:
      "Affordable MBBS with globally recognized degrees. English medium, WHO & MCI approved.",
    image:
      "https://medicalcounseling.in/wp-content/uploads/2023/02/mbbs-doctor-medica-student-1200x580.jpg",
    url: "https://vsourceadmissions.com/",
  },
  {
    title: "MBBS in Russia",
    description:
      "Top Russian medical universities. Budget-friendly with global career opportunities.",
    image: "/assets/images/badges/mbbs in russia.jpg",
    url: "https://vsourceadmissions.com/",
  },
  {
    title: "Masters in US",
    description:
      "Get accepted into top US universities with high visa approval and career support.",
    image: "/assets/images/badges/masters in usa.jpg",
    url: "https://vsourceoverseas.com/",
  },
  {
    title: "Masters in UK",
    description:
      "1-year Master's programs in world-class UK universities. Post-study work visa included.",
    image:
      "https://blog.skoolville.com/wp-content/uploads/2021/10/shutterstock_1932463967.jpg",
    url: "https://vsourceoverseas.com/",
  },
  {
    title: "Masters in Ireland",
    description:
      "Study in tech-driven Irish universities. Fast-track PR and industry-ready curriculum.",
    image: "/assets/images/badges/mbbs in ireland.jpg",
    url: "https://vsourceoverseas.com/",
  },
  {
    title: "Masters in France",
    description:
      "Affordable tuition and diverse culture. Study in top French universities in English.",
    image:
      "https://thumbs.dreamstime.com/b/group-smiling-students-mortarboards-education-graduation-people-concept-gowns-waving-over-london-city-big-ben-74500313.jpg",
    url: "https://vsourceoverseas.com/",
  },
  {
    title: "Paramedical Course",
    description:
      "B.Sc Agriculture | Paramedical Courses | In Top NAAC A, A+, A++ Universities",
    image: "https://dianagroupofinstitutions.com/wp-content/uploads/2024/03/image4.jpg",
    url: "https://vsourcevarsity.com/",
  },
  {
    title: "B.Sc Agriculture Course",
    description: "In ICAR ACCREDITED NIRF RANKED UNIVERSITY",
    image: "/assets/images/bsc.jpg",
    url: "https://vsourcevarsity.com/",
  },
];

const resolveImageUrl = (imagePath: string) => {
  if (!imagePath) return fallbackImage;

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("/assets/")) {
    return imagePath;
  }

  if (imagePath.startsWith("/admin/")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${ADMIN_BASE_URL}${imagePath}`;
  }

  return `${ADMIN_BASE_URL}/${imagePath}`;
};

const CoursesSection = () => {
  const [courseCategories, setCourseCategories] =
    useState<CourseItem[]>(defaultCourses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${ADMIN_BASE_URL}/get_courses.php`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const formattedCourses: CourseItem[] = data.map((course) => ({
            title: course.title || "",
            subtitle: course.subtitle || "",
            description: course.description || "",
            image: resolveImageUrl(course.image || ""),
            url: course.url || "#",
          }));

          setCourseCategories(formattedCourses);
        } else {
          setCourseCategories(defaultCourses);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setCourseCategories(defaultCourses);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isMobile && courseCategories.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          return (prevIndex + 1) % courseCategories.length;
        });
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, courseCategories.length]);

  useEffect(() => {
    if (currentIndex >= courseCategories.length) {
      setCurrentIndex(0);
    }
  }, [courseCategories.length, currentIndex]);

  const nextSlide = () => {
    if (courseCategories.length === 0) return;

    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % courseCategories.length;
    });
  };

  const prevSlide = () => {
    if (courseCategories.length === 0) return;

    setCurrentIndex((prevIndex) => {
      return (
        (prevIndex - 1 + courseCategories.length) % courseCategories.length
      );
    });
  };

  return (
    <section className="pt-2 pb-8 md:pt-4 md:pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Educational Programs"
          subtitle="Explore our diverse range of educational programs and opportunities"
        />

        <AnimateOnScroll>
          {loading && (
            <div className="mt-12 text-center text-gray-500 font-medium">
              Loading courses...
            </div>
          )}

          {!loading && !isMobile && (
            <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courseCategories.map((course, index) => (
                <div
                  key={`${course.title}-${index}`}
                  className="course-card group bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative h-48">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackImage;
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-xl text-white font-bold">
                          {course.title}
                        </h3>

                        {course.subtitle && (
                          <p className="text-white/90 text-sm">
                            {course.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>

                  <div className="p-5">
                    <p className="text-gray-600 mb-5 text-sm">
                      {course.description}
                    </p>

                    <div className="flex justify-between items-center gap-2">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 border border-primary hover:bg-primary/5 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        View Program
                      </a>

                      <a
                        href="tel:+919912611119"
                        className="bg-primary hover:bg-primary/90 text-white text-sm py-2 px-4 rounded-md transition-colors shadow-md"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && isMobile && (
            <div className="mt-10 relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {courseCategories.map((course, index) => (
                    <div
                      key={`${course.title}-${index}`}
                      className="w-full flex-shrink-0 p-3"
                    >
                      <div className="course-card bg-white rounded-lg overflow-hidden shadow-md">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="relative h-48">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = fallbackImage;
                              }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                              <h3 className="text-xl text-white font-bold">
                                {course.title}
                              </h3>

                              {course.subtitle && (
                                <p className="text-white/80 text-sm">
                                  {course.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>

                        <div className="p-4">
                          <p className="text-gray-600 mb-5 text-sm">
                            {course.description}
                          </p>

                          <div className="flex justify-between items-center gap-2">
                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 border border-primary hover:bg-primary/5 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                              View Program
                            </a>

                            <a
                              href="tel:+919912611119"
                              className="bg-primary hover:bg-primary/90 text-white text-sm py-2 px-4 rounded-md transition-colors shadow-md"
                            >
                              Call Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-100"
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-100"
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="flex justify-center mt-6 space-x-2">
                {courseCategories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? "bg-primary scale-110"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CoursesSection;