import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-darkblue text-white pt-12 pb-6">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div>
          {/* <Link to="/" className="inline-block mb-4">
              <img src="/lovable-uploads/b5b42637-3407-4f15-bba6-e67d8998c48a.png" alt="Vsource Logo" className="h-12 w-auto object-contain" />
            </Link> */}
          <p className="text-gray-400 mb-4">
            Your trusted educational consultancy with 20+ years of experience in
            university admissions, overseas education, work visas and educational loans.
          </p>
          <div className="flex space-x-6">
            {/* Facebook */}
            <a href="https://www.facebook.com/vsourcembbsabroad" className="group">
              <img
                src="/assets/images/icons/fb.png"
                alt="Facebook"
                className="w-16 h-16 hover:scale-110 transition-transform duration-300"
              />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/vsource_mbbs_abroad/" className="group">
              <img
                src="/assets/images/icons/insta.png"
                alt="Instagram"
                className="w-16 h-16 hover:scale-110 transition-transform duration-300"
              />
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UCNVjrnqI9L873rkB-5_p4kA" className="group">
              <img
                src="/assets/images/icons/yt.png"
                alt="YouTube"
                className="w-16 h-16 hover:scale-110 transition-transform duration-300"
              />
            </a>

            {/* LinkedIn */}
            <a href="https://in.linkedin.com/company/vsource-company" className="group">
              <img
                src="/assets/images/icons/linked in.png"
                alt="LinkedIn"
                className="w-16 h-16 hover:scale-110 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Indian University Admissions
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                MBBS/Masters Abroad
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Work Visa Facilitation
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Student Loans
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Career Counseling
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              {/* <Link to="/join-us" className="text-gray-400 hover:text-white transition-colors">
                  Join Us
                </Link> */}
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Branches
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-400">+91 99126 11119</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-primary" />
              <span className="text-gray-400">Support@vsourceadmissions.com</span>
            </li>
            <li className="flex">
              <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
              <span className="text-gray-400">Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar, Hyderabad- 500060, Telangana.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-6 mt-6 text-center md:flex md:justify-between md:text-left">
        <p className="text-gray-400 mb-4 md:mb-0">
          © {currentYear} <a
            href="/"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default behavior of the anchor tag
              window.location.reload(); // Reload the page
            }}
            className="text-white hover:underline"
          >
            Vsource Company
          </a> All rights reserved.
        </p>
        <div className="flex justify-center md:justify-end space-x-6">
          <Link to="https://vsourceadmissions.com/Privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="https://vsourceadmissions.com/Terms" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;