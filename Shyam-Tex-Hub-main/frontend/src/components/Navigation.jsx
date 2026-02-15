import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from '../data/mockData';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fffef2] border-b border-[#bcbbb4] px-10 py-5 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo with Brand Name - Enhanced Size */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/hjtz97hz_WhatsApp%20Image%202026-02-05%20at%202.37.00%20PM.jpeg" 
            alt="Shyam Tex Hub" 
            className="h-12 w-auto object-contain"
          />
          <span className="text-[32px] font-medium text-[#a32820] tracking-[0.1px]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shyam Tex Hub
          </span>
        </Link>

        {/* Desktop Navigation - Calibrated */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-[#333333] no-underline text-[14.5px] py-3 relative transition-all duration-200 hover:text-[#a32820]" style={{ letterSpacing: '0.3px', lineHeight: '1.4' }} ${
                  location.pathname === link.path ? 'active-link' : ''
                }`}
              >
                {link.name}
                <span className={`absolute bottom-2 left-0 h-[1px] bg-[#333333] transition-all duration-500 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 hover:w-full'
                }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#333333]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-[#bcbbb4] pt-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[#333333] no-underline text-sm block py-2 hover:text-[#a32820] transition-colors ${
                    location.pathname === link.path ? 'text-[#a32820] font-medium' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
