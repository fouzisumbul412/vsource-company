
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "react-router-dom";

const JoinUsPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Job listing state
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  interface JobListing {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
  }

  // Sample job listings
  const jobListings: JobListing[] = [
    {
      id: 1,
      title: "B.Tech",
      department: "Undergraduate Programs",
      location: "India",
      type: "Full-time Guidance",
      description:
        "Get expert counseling to help you choose the best B.Tech programs and colleges across India.",
      responsibilities: [
        "Help students select the right engineering discipline",
        "Assist with college entrance exams and applications",
        "Guide on counseling rounds and seat allotment",
        "Provide timeline and checklist support"
      ],
      requirements: [
        "Completed or appearing for 12th grade with PCM",
        "Aspirants for JEE Main, State CET, or Private University exams",
        "Interest in engineering and technology fields"
      ]
    },
    {
      id: 2,
      title: "MBBS Abroad",
      department: "Medical Admissions",
      location: "Russia, Georgia, Philippines & more",
      type: "International Admission Support",
      description:
        "We assist students in securing MBBS admissions in reputed international universities with MCI approval.",
      responsibilities: [
        "Shortlist safe and accredited international universities",
        "Help with application process and visa documentation",
        "Coordinate pre-departure and travel planning",
        "Ensure MCI/NMC compliance of programs"
      ],
      requirements: [
        "Minimum 50% in 12th grade (PCB)",
        "NEET qualification required",
        "Passport and financial readiness for overseas studies"
      ]
    },
    {
      id: 3,
      title: "Masters in US/UK",
      department: "Postgraduate Programs",
      location: "USA / UK",
      type: "Full-time Counseling",
      description:
        "Start your journey to top universities in the US or UK for your master’s degree with complete admission support.",
      responsibilities: [
        "Profile evaluation and university shortlisting",
        "Help with SOP, LOR, and resume drafting",
        "Assistance with application and deadlines",
        "Visa interview preparation and pre-departure briefings"
      ],
      requirements: [
        "Completed undergraduate degree",
        "IELTS/TOEFL and GRE if applicable",
        "Willingness to study abroad with strong academic intent"
      ]
    },
    {
      id: 4,
      title: "Education Loans",
      department: "Financial Assistance",
      location: "India / Abroad",
      type: "Loan Assistance",
      description:
        "We help students access secured and unsecured education loans for both domestic and international studies.",
      responsibilities: [
        "Assess loan eligibility and documentation",
        "Connect with multiple banks and NBFCs",
        "Guide through secured/unsecured loan options",
        "Support during disbursement and approval stages"
      ],
      requirements: [
        "Valid admission offer from a recognized institution",
        "Co-applicant and collateral (for secured loans)",
        "Clean financial record for loan approval"
      ]
    }
  ];

  const handleJobClick = (jobId: number) => {
    setActiveJob(activeJob === jobId ? null : jobId);
  };

  const handleApplyClick = (job: JobListing) => {
    setSelectedJob(job);
    setShowForm(true);
    window.scrollTo({
      top: document.getElementById("application-form")?.offsetTop,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-300">
              Be part of a passionate team dedicated to transforming students' lives through quality education
            </p>
          </div>
        </div>
      </section>

      {/* Join Us Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Current Openings"
            subtitle="Explore career opportunities at Vsource Company" 
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job, index) => (
              <AnimateOnScroll key={job.id} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{job.location}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{job.description}</p>
                    
                    <div className="mt-auto">
                      <button
                        onClick={() => handleJobClick(job.id)}
                        className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {activeJob === job.id && (
                        <div className="mt-4 text-sm text-gray-700">
                          <h4 className="font-semibold mb-2">Responsibilities:</h4>
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            {job.responsibilities.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                          
                          <h4 className="font-semibold mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 mb-4 space-y-1">
                            {job.requirements.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t p-4 bg-gray-50">
                    <button 
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-medium transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Application Form */}
      <section id="application-form" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            {showForm ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Apply for: {selectedJob?.title}
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Resume (PDF/DOC)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary focus-within:outline-none">
                              <span>Upload a file</span>
                              <input 
                                type="file" 
                                className="sr-only" 
                                accept=".pdf,.doc,.docx"
                                required
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC up to 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter
                      </label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-32"
                        placeholder="Tell us why you're a good fit for this position..."
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="consent"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                        I agree to Vsource Company processing my data for recruitment purposes
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto text-center">
                <SectionTitle 
                  title="Ready to Join Our Team?"
                  subtitle="Select a job above and apply through our simple application process"
                />
                <p className="mt-6 text-gray-600">
                  Can't find a position that matches your skills? Send us your resume 
                  for future opportunities.
                </p>
                <Link 
                  to="/contact"
                  className="mt-6 inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default JoinUsPage;
