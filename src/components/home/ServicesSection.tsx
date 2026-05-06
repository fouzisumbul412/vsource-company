import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

type ServiceItem = {
  id?: number | string;
  title: string;
  description: string;
  imageSrc: string;
  logoSrc: string;
  externalUrl: string;
};

type ServicesApiResponse = {
  status: string;
  data?: ServiceItem[];
  message?: string;
};

const ADMIN_BASE_URL = "/admin";

const FALLBACK_IMAGE = "https://via.placeholder.com/600x400?text=Image+Not+Found";
const FALLBACK_LOGO = "https://via.placeholder.com/200x200?text=Logo";

const defaultServices: ServiceItem[] = [
  {
    title: "BTECH",
    description:
      "Igniting Your Journey To Engineering Excellence\nIn CSE (AI/ML)",
    imageSrc: "/assets/images/badges/b tech.jpeg",
    externalUrl: "https://vsourcevarsity.com/",
    logoSrc: "/assets/images/logo varsity.png",
  },
  {
    title: "MBBS IN ABROAD",
    description:
      "Affordable, Globally Recognized\n MBBS Abroad\nGeorgia | Russia",
    imageSrc: "/assets/images/badges/mbbs.jpg",
    externalUrl: "https://vsourceadmissions.com/",
    logoSrc: "/assets/images/mini logo.png",
  },
  {
    title: "ABROAD MASTERS",
    description:
      "Turn your masters dream\n into a global reality\nUS | UK | IRELAND | CANADA | FRANCE",
    imageSrc: "/assets/images/badges/aborad.jpg",
    externalUrl: "https://vsourceoverseas.com/",
    logoSrc: "/assets/images/logo overseas.png",
  },
  {
    title: "EDU LOAN",
    description:
      "100% EDUCATION LOAN\nFOR BTECH IN NAAC A, A+, A++\nFOR MASTER IN US | UK | IRELAND | CANADA | FRANCE",
    imageSrc: "/assets/images/badges/edu loan.jpg",
    externalUrl: "https://www.vsourcefintech.com/",
    logoSrc: "/assets/images/logo fintech.png",
  },
];

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchServices = async () => {
      try {
        const response = await fetch(`${ADMIN_BASE_URL}/get_services.php`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const result: ServicesApiResponse = await response.json();

        if (
          result.status === "success" &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          const formattedServices = result.data.map((service) => ({
            id: service.id,
            title: service.title || "",
            description: service.description || "",
            imageSrc: service.imageSrc || FALLBACK_IMAGE,
            logoSrc: service.logoSrc || FALLBACK_LOGO,
            externalUrl: service.externalUrl || "#",
          }));

          setServices(formattedServices);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setServices(defaultServices);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    return () => controller.abort();
  }, []);

  const openServiceUrl = (url: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive educational solutions to help you achieve your academic and career goals"
        />

        {loading && (
          <div className="mt-12 text-center text-gray-500 font-medium">
            Loading services...
          </div>
        )}

        {!loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <AnimateOnScroll
                key={service.id || `${service.title}-${index}`}
                delay={index * 100}
              >
                <div
                  onClick={() => openServiceUrl(service.externalUrl)}
                  className="relative overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[16/13] md:aspect-[16/9] overflow-hidden">
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-5">
                    <div>
                      <img
                        src={service.logoSrc}
                        alt={`${service.title} Logo`}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = FALLBACK_LOGO;
                        }}
                      />

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-sm sm:text-base text-white whitespace-pre-line leading-snug">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-3 flex gap-3 flex-wrap sm:flex-nowrap">
                      <a
                        href={service.externalUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm bg-white text-black font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-gray-200 transition text-center flex-1 sm:flex-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        VIEW PROGRAM
                      </a>

                      <a
                        href="tel:+919912611119"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm bg-red-600 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-red-700 transition text-center flex-1 sm:flex-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        CALL NOW
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;