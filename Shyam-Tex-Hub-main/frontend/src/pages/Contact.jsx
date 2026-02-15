import React, { useState } from 'react';
import { companyInfo } from '../data/mockData';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
    message: ''
  });

  const [quoteData, setQuoteData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    fabricType: '',
    quantity: '',
    message: ''
  });

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setStatusMessage({ type: 'success', text: response.data.message });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirement: '',
        message: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (error) {
      setStatusMessage({ 
        type: 'error', 
        text: error.response?.data?.detail || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsQuoteSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await axios.post(`${API}/quote`, quoteData);
      setStatusMessage({ type: 'success', text: response.data.message });
      setQuoteData({
        name: '',
        company: '',
        email: '',
        phone: '',
        fabricType: '',
        quantity: '',
        message: ''
      });
      setShowQuoteForm(false);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (error) {
      setStatusMessage({ 
        type: 'error', 
        text: error.response?.data?.detail || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsQuoteSubmitting(false);
    }
  };

  const handleInputChange = (e, isQuote = false) => {
    const { name, value } = e.target;
    if (isQuote) {
      setQuoteData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-[#fffef2]">
      {/* Success/Error Toast - Refined Light Styling */}
      {statusMessage && (
        <div className={`fixed top-24 right-8 z-50 px-8 py-6 transition-all duration-300 shadow-lg ${
          statusMessage.type === 'success' 
            ? 'bg-[#f6f5e8] border border-[#bcbbb4] text-[#333333]' 
            : 'bg-[#fef5f3] border border-[#d4a49a] text-[#7a1e18]'
        }`}>
          <div className="flex items-start gap-3">
            {statusMessage.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 text-[#4a4a4a]">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            )}
            <div>
              <p className="body-regular font-medium mb-1">
                {statusMessage.type === 'success' ? 'Thank You' : 'Notice'}
              </p>
              <p className="body-small">{statusMessage.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="section-padding-small bg-[#f6f5e8] relative overflow-hidden">
        <img 
          src="https://customer-assets.emergentagent.com/job_e674b8d3-b11c-4f36-bc54-386afbbe108b/artifacts/cxhvhdov_WhatsApp%20Image%202026-02-05%20at%202.28.41%20PM.jpeg"
          alt=""
          className="peacock-watermark"
        />
        
        <div className="max-w-[1400px] mx-auto px-10 relative z-10">
          <h1 className="hero-large mb-6">Get in Touch</h1>
          <p className="body-large text-[#666666] max-w-3xl">
            Ready to explore how Shyam Tex Hub can meet your fabric needs? 
            Reach out to our team for inquiries, quotes, or partnership opportunities.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="heading-1 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#a32820] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-3 mb-2">Address</h3>
                    <a 
                      href={companyInfo.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline"
                    >
                      {companyInfo.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#a32820] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-3 mb-2">Phone</h3>
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
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#a32820] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="heading-3 mb-2">Email</h3>
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="body-regular text-[#666666] hover:text-[#a32820] transition-colors duration-200 no-underline"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#f6f5e8] p-6">
                <h3 className="heading-3 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="body-regular text-[#666666]">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="body-regular text-[#666666]">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="heading-1 mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="body-regular text-[#333333] mb-2 block">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="body-regular text-[#333333] mb-2 block">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="body-regular text-[#333333] mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="body-regular text-[#333333] mb-2 block">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="requirement" className="body-regular text-[#333333] mb-2 block">
                    Requirement Type
                  </label>
                  <select
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={(e) => handleInputChange(e)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  >
                    <option value="">Select a requirement</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="custom-fabric">Custom Fabric Development</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="body-regular text-[#333333] mb-2 block">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled={isSubmitting}
                    rows="5"
                    className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors resize-none disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section className="section-padding-small bg-[#f6f5e8]">
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-1 mb-6">Request a Quote</h2>
            <p className="body-large text-[#666666] mb-8">
              Need specific fabric quantities? Request a detailed quote and our team will 
              provide competitive pricing tailored to your requirements.
            </p>
            
            {!showQuoteForm ? (
              <button 
                onClick={() => setShowQuoteForm(true)}
                className="btn-primary"
              >
                Request Product Quote
              </button>
            ) : (
              <div className="bg-[#fffef2] p-12 text-left mt-8">
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="quote-name" className="body-regular text-[#333333] mb-2 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="quote-name"
                        name="name"
                        value={quoteData.name}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-company" className="body-regular text-[#333333] mb-2 block">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="quote-company"
                        name="company"
                        value={quoteData.company}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="quote-email" className="body-regular text-[#333333] mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="quote-email"
                        name="email"
                        value={quoteData.email}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-phone" className="body-regular text-[#333333] mb-2 block">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="quote-phone"
                        name="phone"
                        value={quoteData.phone}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fabricType" className="body-regular text-[#333333] mb-2 block">
                        Fabric Type *
                      </label>
                      <select
                        id="fabricType"
                        name="fabricType"
                        value={quoteData.fabricType}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      >
                        <option value="">Select fabric type</option>
                        <option value="Polyester Chiffon">Polyester Chiffon</option>
                        <option value="Crepe">Crepe</option>
                        <option value="Satin">Satin</option>
                        <option value="Twill">Twill</option>
                        <option value="Polyester Viscose Blends">Polyester Viscose Blends</option>
                        <option value="Georgette">Georgette</option>
                        <option value="Polycotton">Polycotton</option>
                        <option value="Poly Mechanical Stretch">Poly Mechanical Stretch</option>
                        <option value="Pocketing & Lining">Pocketing & Lining</option>
                        <option value="Nylon Viscose">Nylon Viscose</option>
                        <option value="Rayon Blends">Rayon Blends</option>
                        <option value="Custom Blend">Custom Blend</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quantity" className="body-regular text-[#333333] mb-2 block">
                        Quantity (meters) *
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={quoteData.quantity}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        disabled={isQuoteSubmitting}
                        placeholder="e.g., 5000"
                        className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-message" className="body-regular text-[#333333] mb-2 block">
                      Additional Requirements
                    </label>
                    <textarea
                      id="quote-message"
                      name="message"
                      value={quoteData.message}
                      onChange={(e) => handleInputChange(e, true)}
                      rows="4"
                      disabled={isQuoteSubmitting}
                      placeholder="Specify colors, finishes, or special requirements"
                      className="w-full px-4 py-3 border border-[#bcbbb4] bg-[#fffef2] text-[#333333] body-regular focus:outline-none focus:border-[#333333] transition-colors resize-none disabled:bg-[#f6f5e8] disabled:cursor-not-allowed"
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary flex-1" disabled={isQuoteSubmitting}>
                      {isQuoteSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowQuoteForm(false)}
                      disabled={isQuoteSubmitting}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
