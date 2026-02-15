import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/mockData';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f6f5e8] border-t border-[#bcbbb4]">
      <div className="max-w-[1400px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/hjtz97hz_WhatsApp%20Image%202026-02-05%20at%202.37.00%20PM.jpeg" 
                alt="Shyam Tex Hub" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-[26px] font-medium text-[#a32820] tracking-[0.1px]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shyam Tex Hub
              </span>
            </div>
            <p className="body-regular text-[#666666] mb-4">
              {companyInfo.subTagline}
            </p>
            <p className="body-small text-[#666666]">
              Premium polyester fabric manufacturer and supplier based in Surat, India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-3 mb-6">Quick Links</h3>
            <ul className="space-y-3 list-none p-0">
              <li>
                <Link to="/about" className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline">
                  Products
                </Link>
              </li>
              {/* <li>
                <Link to="/clients" className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline">
                  Corporate Clients
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="heading-3 mb-6">Contact Information</h3>
            <ul className="space-y-4 list-none p-0">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#a32820] flex-shrink-0 mt-1" />
                <a 
                  href={companyInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-small text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline"
                >
                  {companyInfo.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#a32820] flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  {companyInfo.phoneNumbers.map((phone, index) => (
                    <a 
                      key={index}
                      href={`tel:${phone.number.replace(/\s/g, '')}`}
                      className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline"
                    >
                      {phone.number}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#a32820] flex-shrink-0" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline"
                >
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#bcbbb4] mt-12 pt-8">
          <p className="body-small text-[#666666] text-center">
            © {new Date().getFullYear()} Shyam Tex Hub. All rights reserved. | Trusted by leading garment manufacturers and buying houses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
