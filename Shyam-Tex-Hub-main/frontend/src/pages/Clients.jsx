import React from 'react';
import { corporateClients } from '../data/mockData';

const Clients = () => {
  return (
    <div className="bg-[#fffef2]">
      {/* Hero Section */}
      <section className="section-padding-small bg-[#f6f5e8] relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <h1 className="hero-large mb-6">Our Corporate Clients</h1>
          <p className="body-large text-[#666666] max-w-3xl">
            Trusted by leading garment manufacturers, export houses, and buying houses. 
            We take pride in building long-standing B2B relationships based on quality, 
            reliability, and mutual growth.
          </p>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <h2 className="heading-1 text-center mb-16">Esteemed Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {corporateClients.map((client, index) => (
              <div 
                key={index}
                className="bg-[#f6f5e8] h-40 flex items-center justify-center p-8 hover-lift"
              >
                <h3 className="heading-3 text-center text-[#333333]">{client.name}</h3>
              </div>
            ))}
            
            {/* Additional placeholder for "Various Others" */}
            <div className="bg-[#f6f5e8] h-40 flex items-center justify-center p-8 hover-lift">
              <p className="body-regular text-center text-[#666666]">+ Many More</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding-small bg-[#f6f5e8]">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Why Leading Brands Trust Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Quality Assurance",
                  desc: "Consistent quality that meets global standards"
                },
                {
                  title: "Reliable Delivery",
                  desc: "On-time delivery for domestic and international orders"
                },
                {
                  title: "Custom Solutions",
                  desc: "Tailored fabric development for unique requirements"
                }
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="heading-3 mb-3">{item.title}</h3>
                  <p className="body-regular text-[#666666]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="body-large text-[#666666] italic mb-6">
              "Our partnership with Shyam Tex Hub has been instrumental in maintaining 
              the high quality standards our brand is known for. Their consistent delivery 
              and attention to detail make them an invaluable partner."
            </p>
            <p className="body-regular text-[#4a4a4a]">— Corporate Partner</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-small bg-[#333333] text-white">
        <div className="max-w-[1400px] mx-auto px-10 text-center">
          <h2 className="hero-medium text-white mb-6">
            Become Our Next Success Story
          </h2>
          <p className="body-large text-[#bcbbb4] mb-8 max-w-2xl mx-auto">
            Join our growing family of satisfied clients. Experience the Shyam Tex Hub difference.
          </p>
          <a href="/contact" className="btn-primary !border-white !text-white hover:!bg-white hover:!text-[#333333]">
            Partner With Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Clients;
