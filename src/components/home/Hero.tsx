import { useEffect, useState } from "react";

type BannerResponse = {
  status?: string;
  banner?: string;
  image_url?: string;
  image_path?: string;
  message?: string;
};

const ADMIN_BASE_URL = "/admin";

const resolveBannerUrl = (bannerPath: string) => {
  if (!bannerPath) return "";

  if (
    bannerPath.startsWith("http://") ||
    bannerPath.startsWith("https://") ||
    bannerPath.startsWith("data:")
  ) {
    return bannerPath;
  }

  if (bannerPath.startsWith("/admin/")) {
    return bannerPath;
  }

  if (bannerPath.startsWith("/")) {
    return bannerPath;
  }

  return `${ADMIN_BASE_URL}/${bannerPath.replace(/^\/+/, "")}`;
};

const Hero = () => {
  const [heroBanner, setHeroBanner] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchHeroBanner = async () => {
      try {
        const response = await fetch(`${ADMIN_BASE_URL}/get-hero-image.php`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch banner");
        }

        const data: BannerResponse = await response.json();

        const bannerPath = data.banner || data.image_url || data.image_path || "";

        if (data.status === "success" && bannerPath) {
          setHeroBanner(resolveBannerUrl(bannerPath));
        } else if (bannerPath) {
          setHeroBanner(resolveBannerUrl(bannerPath));
        } else {
          setHeroBanner("");
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setHeroBanner("");
        }
      }
    };

    fetchHeroBanner();

    return () => controller.abort();
  }, []);

  const handleBackgroundImageError = () => {
    setHeroBanner("");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center text-white overflow-hidden pt-16 md:pt-0 bg-darkblue">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-scroll md:bg-fixed"
        style={{
          backgroundImage: heroBanner ? `url("${heroBanner}")` : "none",
        }}
      >
        {heroBanner && (
          <img
            src={heroBanner}
            alt="Hero Background"
            className="hidden"
            onError={handleBackgroundImageError}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-darkblue/40 z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* ========== Desktop ========== */}
          <div className="hidden md:block space-y-6 pt-28">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              Redefining{" "}
              <span className="text-red-500">Education</span> for Tomorrow&apos;s
              Innovators
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 max-w-xl">
              Your trusted educational consultancy with 20+ years of experience
              in guiding students towards successful academic and professional
              futures.
            </p>

            <div className="flex justify-start">
              <img
                src="/assets/images/20 years logo.png"
                alt="20 Years Logo"
                className="w-36 h-auto"
              />
            </div>

            <div className="pt-6 pb-20">
              <p className="text-sm text-gray-400 mb-2">
                Trusted by students across the globe
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[
                      "/assets/images/ANINASH YADAV  (UK).jpeg",
                      "/assets/images/DAKANNAGARI ROHITH REDDY  (USA).jpeg",
                      "/assets/images/SRAVYA SREE BUSSU (USA).jpeg",
                      "/assets/images/SOUMYA GOPAGONI (UK).jpeg",
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
                            e.currentTarget.style.display = "none";
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
              Redefining{" "}
              <span className="text-red-500">Education</span> for Tomorrow&apos;s
              Innovators
            </h1>
          </div>
        </div>
      </div>

      {/* Course Card - Without Images */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="bg-orange-500 text-white shadow-lg py-2 text-center text-sm md:text-lg font-semibold uppercase tracking-wide">
          B.TECH &nbsp;|&nbsp; MASTER&apos;S &nbsp;|&nbsp; MBBS ABROAD
          &nbsp;|&nbsp; EDUCATION LOAN
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style>{`
        .text-\\[31px\\] {
          font-size: 29px;
        }

        .pt-\\[16px\\] {
          padding-top: 200px !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;