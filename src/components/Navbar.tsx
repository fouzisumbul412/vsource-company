import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
     {name:'360 View', path: '/view-360'},
    { name: 'Gallery', path: '/gallery' },
    // { name: 'Join Us', path: '/join-us' },
   
    { name: 'Branches', path: '/contact' }
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <div className="flex items-center">
            <img
              alt="Vsource Logo"
              className="h-12 md:h-16 w-auto object-contain rounded-xl shadow-md"
              src="/assets/images/red vs logo.PNG"
            />
            <img
              alt="20 Years Logo"
              className="h-11 md:h-16 ml-3 w-auto object-contain drop-shadow-md"
              src="https://vsourcevarsity.com/assets/images/20%20YEARS%20LOGO%20n-01.png"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? 'text-primary'
                  : isScrolled
                    ? 'text-gray-800'
                    : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden hover:text-primary relative z-20 ${
            isOpen || isScrolled ? 'text-gray-800' : 'text-white'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-10 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-20 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-lg font-medium py-2 transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
