import React, { useState } from 'react';
import { productCategories } from '../data/mockData';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          <h1 className="hero-large mb-6">Our Product Range</h1>
          <p className="body-large text-[#666666] max-w-3xl">
            Explore our extensive collection of premium polyester fabrics and blends, 
            designed to cater to diverse applications and market demands. Each fabric 
            is crafted with meticulous attention to quality and performance.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productCategories.map((product) => (
              <div 
                key={product.id} 
                className="bg-[#fffef2] overflow-hidden hover-lift cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="heading-3 mb-3">{product.name}</h3>
                  <p className="body-small text-[#666666] mb-4">{product.description}</p>
                  <p className="body-small text-[#4a4a4a]">
                    <span className="font-semibold">Applications:</span> {product.applications}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-[#fffef2] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-96 object-cover"
              />
              
              <div className="p-12">
                <h2 className="heading-1 mb-4">{selectedProduct.name}</h2>
                <p className="body-large text-[#666666] mb-6">{selectedProduct.description}</p>
                
                <div className="border-t border-[#bcbbb4] pt-6 mb-6">
                  <h3 className="heading-3 mb-3">Applications</h3>
                  <p className="body-regular text-[#666666]">{selectedProduct.applications}</p>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="/contact" 
                    className="btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProduct(null);
                      window.location.href = '/contact';
                    }}
                  >
                    Request Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding-small bg-[#f6f5e8]">
        <div className="max-w-[1400px] mx-auto px-10 text-center">
          <h2 className="heading-1 mb-6">Need a Custom Fabric Solution?</h2>
          <p className="body-large text-[#666666] mb-8 max-w-2xl mx-auto">
            We offer customized fabric development to perfectly match your specific requirements. 
            Get in touch with our team to discuss your project.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Our Team
          </a>
        </div>
      </section>
    </div>
  );
};

export default Products;
