import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/site';
import { BookTrialButton } from './ContactButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/home' },
    { name: 'Programs', path: '/programs' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Offers', path: '/offers' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-purple/10 bg-white/95 backdrop-blur shadow-sm">
      <div className="container-custom flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt={siteConfig.name} className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold transition-colors hover:text-purple ${
                location.pathname === link.path ? 'text-purple' : 'text-charcoal'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-2">
            <BookTrialButton compact />
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-charcoal focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-purple/10 shadow-lg pb-6">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-xl font-bold ${
                  location.pathname === link.path
                    ? 'bg-purple/10 text-purple'
                    : 'text-charcoal hover:bg-cream hover:text-purple'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="px-8">
            <BookTrialButton className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
