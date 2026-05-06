import { useEffect, useState } from "react";

type TestimonialItem = {
  name: string;
  testimonial: string;
  image_path: string;
};

type TestimonialsApiResponse = {
  status: string;
  data?: TestimonialItem[];
  message?: string;
};

const ADMIN_BASE_URL = "/admin";

const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Dakannagari Rohith Reddy",
    testimonial:
      "I had an amazing experience with Vsource. From day one, the team was supportive, patient, and always available to answer my questions. Their attention to detail ensured my visa application was perfect. Highly recommended",
    image_path: "/assets/images/DAKANNAGARI ROHITH REDDY  (USA).jpeg",
  },
  {
    name: "Aninash Yadav",
    testimonial:
      "Vsource Consultancy made my dream of studying abroad a reality. Their expertise and step-by-step guidance made the entire process smooth and stress-free. Special thanks to the counsellors for being so responsive and professional",
    image_path: "/assets/images/ANINASH YADAV  (UK).jpeg",
  },
  {
    name: "Duddempudi Sahana",
    testimonial:
      "I'm truly grateful to Vsource Consultancy for their dedicated support throughout my student visa journey. They were transparent, thorough, and genuinely cared about my success. Thank you for making it happen",
    image_path: "/assets/images/DUDDEMPUDI SAHANA  (USA).jpeg",
  },
  {
    name: "Asar Ali Mohammed",
    testimonial:
      "The service I received from Vsource Consultancy exceeded all my expectations. They guided me through every step of the process, and their insights into the visa requirements were incredibly helpful. Highly trustworthy",
    image_path: "/assets/images/ASAR ALI MOHAMMED  (UK).jpeg",
  },
  {
    name: "Moghal Saheera Begum",
    testimonial:
      "Vsource Consultancy is hands down the best in the business. Their knowledge, efficiency, and personalized service made a complex process seem simple. I couldn't have asked for better support.",
    image_path: "/assets/images/MOGHAL SAHEERA BEGUM  (UK).jpeg",
  },
  {
    name: "Harsha Vardhan Reddy",
    testimonial:
      "From choosing the right country to preparing my documents, Vsource Consultancy was there with me at every stage. The staff is well-informed and very approachable. They turned a stressful process into an enjoyable journey.",
    image_path: "/assets/images/HARSHA VARDHAN REDDY (USA).jpeg",
  },
  {
    name: "Ashritha Reddy Beerelly",
    testimonial:
      "A big thank you to Vsource Consultancy! Their team helped me secure my visa without any hiccups. They were always available to clarify doubts and ensured every document was in perfect order.",
    image_path: "/assets/images/ASHRITHA REDDY BEERELLY (UK).jpeg",
  },
  {
    name: "Kannikanti Geethika Chowdary",
    testimonial:
      "Exceptional service! Vsource Consultancy guided me with patience and professionalism. Their attention to every detail made all the difference. I highly recommend them to anyone looking to study or work abroad.",
    image_path: "/assets/images/KANNIKANTI GEETHIKA CHOWDARY (USA).jpeg",
  },
  {
    name: "Bojja Glory",
    testimonial:
      "The staff at VsourceConsultancy are true professionals. They know exactly what they're doing and keep you informed throughout the process. I am so thankful for their support and guidance.",
    image_path: "/assets/images/BOJJA GLORY (UK).jpeg",
  },
  {
    name: "Khyathi Raguru",
    testimonial:
      "I can't thank Vsource Consultancy enough. Their well-structured process, continuous communication, and honest advice gave me great confidence. My visa was approved smoothly, all thanks to their excellent work.",
    image_path: "/assets/images/KHYATHI RAGURU (USA).jpeg",
  },
  {
    name: "Deekshith Kumar Gudepu",
    testimonial:
      "Superb service from start to finish! The team was incredibly knowledgeable and handled my application with care and precision. Thank you, Vsource Consultancy, for your outstanding support.",
    image_path: "/assets/images/DEEKSHITH KUMAR GUDEPU (UK).jpeg",
  },
  {
    name: "Nithya Sree Bussu",
    testimonial:
      "I was impressed by how organized and efficient Vsource Consultancy is. They guided me on every requirement, kept me updated, and ensured my application was flawless. 100% satisfied",
    image_path: "/assets/images/NITHYA SREE BUSSU (USA).jpeg",
  },
  {
    name: "Kathi Tulasi",
    testimonial:
      "I had a wonderful experience with Vsource Consultancy. Their expert advice and friendly attitude made me feel at ease throughout the process. Highly recommended for anyone planning to go abroad",
    image_path: "/assets/images/KATHI TULASI (UK).jpeg",
  },
  {
    name: "Preethi Kalva",
    testimonial:
      "Professional, friendly, and reliable — that's how I'd describe Abroad Consultancy. They handled my entire visa application seamlessly. Their commitment is commendable",
    image_path: "/assets/images/PREETHI KALVA (USA).jpeg",
  },
  {
    name: "Sravya Sree Bussu",
    testimonial:
      "Vsource Consultancy offers a rare combination of professionalism and personal attention. They helped me with everything — from choosing universities to visa documentation. Thank you for making it so easy",
    image_path: "/assets/images/SRAVYA SREE BUSSU (USA).jpeg",
  },
  {
    name: "Pakala Meghana Reddy",
    testimonial:
      "If you're confused about how to start your study abroad journey, look no further than Vsource Consultancy. They are incredibly supportive and efficient. I had a flawless experience",
    image_path: "/assets/images/PAKALA MEGHANA REDDY (UK).jpeg",
  },
  {
    name: "Soumya Gopagoni",
    testimonial:
      "I was nervous about the visa process, but Vsource Consultancy made it completely hassle-free. Their team is approachable, experienced, and always ready to help. A big thank you",
    image_path: "/assets/images/SOUMYA GOPAGONI (UK).jpeg",
  },
  {
    name: "Adavalli Tharun Kumar",
    testimonial:
      "Thanks to Vsource Consultancy, I'm now on my way to study in Canada! Their guidance was thorough, and they followed up consistently to make sure I didn't miss anything. Great team",
    image_path: "/assets/images/ADAVALLI THARUN KUMAR (UK).jpeg",
  },
  {
    name: "Ummagani Sai Kumar",
    testimonial:
      "The best decision I made was choosing Vsource Consultancy for my student visa. They are reliable, knowledgeable, and genuinely interested in your success. I highly recommend their services.",
    image_path: "/assets/images/UMMAGANI SAI KUMAR (UK).jpeg",
  },
  {
    name: "Priyanka",
    testimonial:
      "Outstanding experience with Vsource Consultancy. Their team is well-trained, courteous, and fully committed to helping clients achieve their goals. Thank you for your constant support and encouragement",
    image_path: "/assets/images/Priyanka.jpg",
  },
];

const resolveImageUrl = (imagePath: string) => {
  if (!imagePath) return "";

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

const getAvatarFallback = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Student"
  )}&background=random&size=200`;
};

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] =
    useState<TestimonialItem[]>(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${ADMIN_BASE_URL}/get_testimonials.php`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const result: TestimonialsApiResponse = await response.json();

        if (
          result.status === "success" &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          const formattedTestimonials = result.data.map((item) => ({
            name: item.name || "",
            testimonial: item.testimonial || "",
            image_path: resolveImageUrl(item.image_path || ""),
          }));

          setTestimonialsData(formattedTestimonials);
        } else {
          setTestimonialsData(defaultTestimonials);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setTestimonialsData(defaultTestimonials);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (testimonialsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  useEffect(() => {
    if (currentIndex >= testimonialsData.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, testimonialsData.length]);

  const handlePrev = () => {
    if (testimonialsData.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (testimonialsData.length === 0) return;

    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: -100% 0; }
          }

          .animated-bg {
            background-image: url('/assets/images/badges/bg test.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.25;
          }

          @media (max-width: 640px) {
            .animated-bg {
              background-size: 200% 100%;
              background-repeat: repeat-x;
              animation: moveBackground 40s linear infinite;
            }
          }
        `}
      </style>

      {/* Background */}
      <div className="animated-bg z-0"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-600 drop-shadow-lg">
            Success Stories
          </h2>

          <p className="text-base md:text-lg text-gray-900 mt-8 md:mt-10">
            Hear from our students who have achieved their academic and career
            goals with our guidance.
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-700 font-medium py-10">
            Loading testimonials...
          </div>
        )}

        {!loading && activeTestimonial && (
          <>
            {/* Desktop */}
            <div className="hidden sm:block relative h-[400px] w-full">
              <div className="flex items-center justify-center h-full">
                <div className="bg-white bg-opacity-70 text-black p-5 rounded-xl max-w-4xl w-full mx-auto">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={activeTestimonial.image_path}
                        alt={activeTestimonial.name}
                        loading="lazy"
                        className="rounded-full w-36 h-36 object-cover shadow-lg"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = getAvatarFallback(
                            activeTestimonial.name
                          );
                        }}
                      />
                    </div>

                    <div className="flex-grow">
                      <p className="text-lg md:text-xl mb-4 italic leading-relaxed">
                        &ldquo;{activeTestimonial.testimonial}&rdquo;
                      </p>

                      <h3 className="text-xl md:text-2xl font-semibold">
                        {activeTestimonial.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                ◀
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                ▶
              </button>
            </div>

            {/* Mobile */}
            <div className="sm:hidden relative py-4">
              <div className="overflow-hidden px-4">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {testimonialsData.map(({ name, testimonial, image_path }, i) => (
                    <div key={`${name}-${i}`} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-all duration-300">
                        <div className="mb-4">
                          <img
                            src={image_path}
                            alt={name}
                            loading="lazy"
                            className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.src = getAvatarFallback(name);
                            }}
                          />
                        </div>

                        <p className="text-md italic mb-3">
                          &ldquo;{testimonial}&rdquo;
                        </p>

                        <h3 className="text-lg font-semibold">{name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
                aria-label="Previous testimonial"
              >
                ◀
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
                aria-label="Next testimonial"
              >
                ▶
              </button>

              <div className="flex justify-center mt-5 gap-2 flex-wrap">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "bg-red-600 scale-110"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}