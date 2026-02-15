import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo, whyChooseUs, productCategories } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-[#fffef2]">
      {/* Hero Section - Calibrated European Luxury */}
      <section className="section-padding relative overflow-hidden">
        {/* Peacock Feather Watermark - Large Premium Style */}
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark-large"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <div className="max-w-3xl">
            <p className="text-[13px] text-[#a32820] mb-4 font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '1.2px' }}>
              {companyInfo.tagline}
            </p>
            <h1 className="hero-large">{companyInfo.subTagline}</h1>
            <p className="body-large text-[#666666] mb-12">
              Premium polyester fabric manufacturer and supplier based in Surat, India. 
              With decades of experience, we deliver excellence through quality, innovation, 
              and unwavering client satisfaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Explore Fabrics
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding-small bg-[#f6f5e8]">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="heading-1 mb-6">Who We Are</h2>
              <p className="body-large text-[#666666] leading-relaxed">
                Shyam Tex Hub is a dynamic and forward-thinking manufacturer and supplier 
                of premium polyester fabrics. Our state-of-the-art production facilities 
                are equipped to handle large-scale manufacturing while maintaining meticulous 
                attention to detail at every stage of the process.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1618437542145-38e9015cf8f1?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Premium Polyester Fabrics"
                className="w-full h-96 object-cover hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding-small">
        <div className="max-w-[1400px] mx-auto px-10">
          <h2 className="heading-1 text-center mb-16">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Manufacturing", desc: "State-of-the-art production facilities" },
              { title: "Supplying", desc: "Reliable delivery across India and globally" },
              { title: "Custom Development", desc: "Tailored fabric solutions for your needs" },
              { title: "Dyeing & Printing", desc: "Solid dyeing, printing, and digital printing" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="heading-3 mb-3">{item.title}</h3>
                <p className="body-regular text-[#666666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding-small bg-[#f6f5e8] relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <h2 className="heading-1 text-center mb-16">Why Choose Shyam Tex Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-[#fffef2] p-8 hover-lift">
                <h3 className="heading-3 mb-4">{item.title}</h3>
                <p className="body-regular text-[#666666]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="text-center mb-16">
            <h2 className="heading-1 mb-4">Our Product Range</h2>
            <p className="body-large text-[#666666] text-center">
              Extensive range of premium polyester fabrics designed for diverse applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {productCategories.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-[#fffef2] overflow-hidden hover-lift cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="heading-3 mb-2">{product.name}</h3>
                  <p className="body-small text-[#666666]">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Company Profile Download Section */}
      {/* <section className="section-padding-small bg-[#f6f5e8]">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Download Our Company Profile</h2>
            <p className="body-large text-[#666666] mb-8">
              Get detailed information about our products, capabilities, and services. 
              Perfect for sharing with your team or reviewing at your convenience.
            </p>
            <a 
              href="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/48p429a6_Shyam%20Tex%20Hub%20%E2%80%93%20Profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Company Profile
            </a>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="section-padding-small bg-[#333333] text-white">
        <div className="max-w-[1400px] mx-auto px-10 text-center">
          <h2 className="hero-medium text-white mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="body-large text-[#bcbbb4] mb-8 max-w-2xl mx-auto">
            Join leading garment manufacturers and buying houses who trust Shyam Tex Hub 
            for their fabric needs
          </p>
          <Link to="/contact" className="btn-primary !border-white !text-white hover:!bg-white hover:!text-[#333333]">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
