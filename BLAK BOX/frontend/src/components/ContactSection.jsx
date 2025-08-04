// src/components/ContactSection.jsx
import React from 'react';
import '../styles/styleContact.css';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, comments, or suggestions, you can also reach out directly
            via WhatsApp or Email—or just fill out the form below.
          </p>
          <div className='contact-image'></div>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="https://wa.me/+593987600150"
              className="btn btn-contact btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} style={{ marginRight: '8px' }} />
              WhatsApp Us
            </a>
            <a
              href="mailto:support@blakbox.com"
              className="btn btn-contact btn-email"
            >
              <FaEnvelope size={20} style={{ marginRight: '8px' }} />
              Email Us
            </a>
          </div>
        </div>

        {/* -------------- Embeded form -------------- */}
        <div className="contact-form">
          <div className="formmy-wrapper">
            <iframe
              title="Formmy Contact Form"
              src="https://www.formmy.app/preview/688fd7d21f9d94aa295459ed"
              frameBorder="0"
              scrolling="yes"
              className="formmy-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
