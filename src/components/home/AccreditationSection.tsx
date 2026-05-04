const Accreditation = () => {
  const accreditations = [
    { name: "ICEF", logo: "https://icef-api-production.s3.eu-central-1.amazonaws.com/ias_material/0016M00002d5M0sQAE_badge.png" },
    { name: "ETS", logo: "https://vsourceoverseas.com/assets/images/ets.jpeg" },
    { name: "EAIE", logo: "https://vsourceoverseas.com/assets/images/images.png" },
    { name: "NAFSA", logo: "https://vsourceoverseas.com/assets/images/nafsa.jpeg" }
  ];

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto">
        <h1 className="text-4xl font-normal text-center text-black mb-6">
          Accreditation & Memberships
        </h1>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...accreditations, ...accreditations].map((item, index) => (
              <div key={index} className="flex flex-col items-center min-w-[150px] mx-6">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-24 md:h-32 w-auto object-contain"
                />
                <p className="mt-2 text-sm text-text text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <b>"VSOURCE is proud to be associated with these prestigious organizations, 
            ensuring the highest standards of educational services."</b>
          </p>
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Accreditation;
