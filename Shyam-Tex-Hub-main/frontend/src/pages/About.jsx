import React from 'react';
import { aboutContent } from '../data/mockData';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#fffef2]">
      {/* Hero Section */}
      <section className="section-padding-small bg-[#f6f5e8] relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark-large"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <h1 className="hero-large mb-6">About Shyam Tex Hub</h1>
          <p className="body-large text-[#666666] max-w-3xl">
            {aboutContent.description}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-[#f6f5e8] p-12">
              <h2 className="heading-1 mb-6">Our Vision</h2>
              <p className="body-large text-[#666666] leading-relaxed">
                {aboutContent.vision}
              </p>
            </div>
            
            <div className="bg-[#f6f5e8] p-12">
              <h2 className="heading-1 mb-6">Our Mission</h2>
              <p className="body-large text-[#666666] leading-relaxed">
                {aboutContent.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="section-padding-small bg-[#f6f5e8] relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <h2 className="heading-1 mb-12 text-center">Manufacturing Excellence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="body-large text-[#666666] mb-8 leading-relaxed">
                {aboutContent.manufacturing.description}
              </p>
              
              <ul className="space-y-4 list-none p-0">
                {aboutContent.manufacturing.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#a32820] flex-shrink-0 mt-1" />
                    <span className="body-regular text-[#666666]">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1636986056375-184676d8ca14?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Manufacturing"
                className="w-full h-96 object-cover hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Global Reach & Logistics</h2>
            <p className="body-large text-[#666666] leading-relaxed text-center mx-auto max-w-2xl">
              {aboutContent.globalReach}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-small bg-[#333333] text-white">
  <div className="max-w-[1400px] mx-auto px-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      {[
        { number: "18+", label: "Years Experience" },
        { number: "300+", label: "Happy Clients" },
        { number: "20+", label: "Product Categories" },
        { number: "100%", label: "Quality Assured" }
      ].map((stat, index) => (
        <div key={index}>
          <div className="text-5xl md:text-6xl font-serif text-white mb-2">
            {stat.number}
          </div>
          <p className="body-regular text-[#bcbbb4]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default About;
