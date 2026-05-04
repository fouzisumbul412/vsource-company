import React, { useState, forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { openGreenPopup } from '../../lib/Popups';

const FaqSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does VSource provide for international students?",
      answer: "VSource provides comprehensive support for international students including university selection guidance, application assistance, visa support, scholarship guidance, SOP & LOR preparation, education loan assistance, and post-landing services to help students transition smoothly to life abroad."
    },
    {
      question: "Do I need IELTS/TOEFL to study abroad?",
      answer: "While many universities require English proficiency tests like IELTS or TOEFL, we can help you identify programs and institutions that offer alternatives or waivers based on your academic background, previous education in English, or through university-specific tests and interviews."
    },
    {
      question: "How do I qualify for scholarships to study abroad?",
      answer: "Scholarships are typically awarded based on academic excellence, extracurricular achievements, leadership qualities, and financial need. Our experts can help you identify scholarship opportunities you qualify for and guide you through the application process to maximize your chances."
    },
    {
      question: "What are the eligibility requirements for post-study work visas?",
      answer: "Eligibility for post-study work visas varies by country. For example, the UK offers a 2-year post-study work visa for most graduates. Our counselors can provide detailed information about work permit requirements for your destination country and help you plan accordingly."
    },
    {
      question: "How much does it cost to study abroad?",
      answer: "The cost varies greatly depending on the country, university, program, and your lifestyle. It typically includes tuition fees, accommodation, living expenses, insurance, and travel costs. Our counselors provide personalized cost estimates based on your specific circumstances and help identify affordable options and financial aid opportunities."
    },
    {
      question: "When should I start my application process?",
      answer: "We recommend starting at least 12-18 months before your intended intake. This allows sufficient time for research, test preparation, application submission, visa processing, and making financial arrangements. However, we also offer fast-track options for students with shorter timeframes."
    }
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Get answers to common questions about studying abroad and our services" 
        />
        
        <AnimateOnScroll>
          <div className="mt-10 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                  {openIndex === index ? 
                    <ChevronUp className="h-5 w-5 text-primary" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                </button>
                
                <div 
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll delay={200}>
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? Our education experts are ready to help!
            </p>
            <button 
              onClick={openGreenPopup}
              className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-red-600 transition-colors"
            >
              Get Expert Advice
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
});

export default FaqSection; 