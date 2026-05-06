import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AboutSection from "../components/home/Aboutsectioninside";
import styled from "styled-components";

type TeamMember = {
  name: string;
  position: string;
  image: string;
  bio: string;
};

type TeamMembersApiResponse = {
  status: string;
  data?: TeamMember[];
  message?: string;
};

const ADMIN_BASE_URL = "/admin";

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

  if (imagePath.startsWith("/uploads/")) {
    return imagePath;
  }

  if (imagePath.startsWith("/uploads/")) {
    return `/${imagePath}`;
  }

  if (imagePath.startsWith("/admin/")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${ADMIN_BASE_URL}${imagePath}`;
  }

  return `${ADMIN_BASE_URL}/${imagePath}`;
};

const StyledTeamWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 55px 24px;
    padding: 10px;
  }

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 260px;
    min-height: 355px;
    background: #fff;
    padding: 20px 20px 18px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    display: flex;
    flex-direction: column;
  }

  .profile-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }

  .profile-card .img {
    width: 100%;
    height: 200px;
    position: relative;
    transform: translateY(-45px);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .img img {
    width: 200px !important;
    height: 200px !important;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }

  .profile-card:hover .img img {
    transform: scale(1.05);
  }

  .caption {
    margin-top: 5px;
    transform: translateY(-45px);
  }

  .caption h3 {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    margin: 0;
    color: #333;
    word-wrap: break-word;
    line-height: 1.3;
  }

  .caption p {
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: rgb(243, 35, 8);
    margin: 6px 0 6px;
    word-wrap: break-word;
    font-weight: 600;
    line-height: 1.3;
  }

  .extra-info {
    font-size: clamp(0.75rem, 2vw, 0.95rem);
    color: #555;
    opacity: 1;
    transform: translateY(-45px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    line-height: 1.45;
  }

  .profile-card,
  .img img,
  .extra-info {
    transition: all 0.3s ease-in-out;
  }

  .loading-text,
  .empty-text,
  .error-text {
    width: 100%;
    text-align: center;
    font-weight: 600;
    padding: 30px 0;
  }

  .loading-text {
    color: #555;
  }

  .empty-text {
    color: #555;
  }

  .error-text {
    color: #dc2626;
  }

  @media (min-width: 768px) {
    .main {
      gap: 60px 30px;
    }

    .profile-card {
      max-width: 280px;
      min-height: 395px;
      padding: 30px 30px 20px 30px;
    }

    .profile-card .img {
      height: 220px;
    }
  }

  @media (max-width: 460px) {
    .main {
      gap: 55px 30px;
    }

    .profile-card {
      max-width: 260px;
      min-height: 330px;
      padding: 10px 10px 16px 10px;
    }

    .profile-card .img {
      height: 180px;
    }

    .img img {
      width: 180px !important;
      height: 180px !important;
    }

    .caption h3 {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
    }

    .caption p {
      font-size: clamp(0.9rem, 2vw, 1rem);
    }

    .extra-info {
      font-size: clamp(0.8rem, 2vw, 0.9rem);
    }
  }
`;

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teamError, setTeamError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTeamMembers = async () => {
      try {
        setLoadingTeam(true);
        setTeamError("");

        const response = await fetch(`${ADMIN_BASE_URL}/get_team_members.php`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const result: TeamMembersApiResponse = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          const formattedTeamMembers = result.data.map((member) => ({
            name: member.name || "",
            position: member.position || "",
            image: resolveImageUrl(member.image || ""),
            bio: member.bio || "",
          }));

          setTeamMembers(formattedTeamMembers);
        } else {
          setTeamMembers([]);
          setTeamError(result.message || "Unable to load team members.");
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setTeamMembers([]);
          setTeamError("Unable to load team members.");
        }
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-36 pb-20 bg-cover bg-center bg-no-repeat relative text-white"
        style={{
          backgroundImage: `url('/assets/images/RETYU.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/90 to-gray-900/90"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>

            <p className="text-xl text-gray-300">
              Learn about our journey, our team, and our mission to provide
              exceptional educational consultancy for over 20 years.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .py-16 {
          padding-top: 0.5rem !important;
          padding-bottom: 4rem;
        }
      `}</style>

      {/* About Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Management Team"
            subtitle="Meet the experts who make Vsource Company a trusted name in educational consultancy"
          />

          <StyledTeamWrapper>
            <div className="main">
              {loadingTeam && (
                <div className="loading-text">Loading team members...</div>
              )}

              {!loadingTeam && teamError && (
                <div className="error-text">{teamError}</div>
              )}

              {!loadingTeam && !teamError && teamMembers.length === 0 && (
                <div className="empty-text">No team members found.</div>
              )}

              {!loadingTeam &&
                !teamError &&
                teamMembers.map((member, index) => (
                  <div className="profile-card" key={`${member.name}-${index}`}>
                    <div className="img">
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </div>

                    <div className="caption">
                      <h3>{member.name}</h3>
                      <p>{member.position}</p>
                    </div>

                    <div className="extra-info">{member.bio}</div>
                  </div>
                ))}
            </div>
          </StyledTeamWrapper>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <AnimateOnScroll>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#0052CC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center text-[#0052CC]">
                  Our Vision
                </h3>

                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To be the leading educational consultancy in India, recognized
                  for our integrity, personalized approach, and consistent
                  delivery of successful academic and career outcomes for our
                  students.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll delay={200}>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#FFC107]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center text-[#FFC107]">
                  Our Mission
                </h3>

                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To empower students with comprehensive guidance, and supportive
                  resources that enable them to make informed decisions about
                  their educational and career paths, both in India and abroad.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;