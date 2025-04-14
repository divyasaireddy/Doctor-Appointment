import React from 'react';
import { Youtube, Twitter, Instagram, Linkedin } from 'lucide-react';

const MedicareFooter = () => {
  // Inject CSS
  const injectCSS = () => {
    const style = document.createElement('style');
    style.textContent = `
      .medicare-footer {
        background-color: #f8fafc;
        color: #333;
        font-family: 'Arial', sans-serif;
      }

      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 50px 20px;
      }

      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .footer-logo {
        display: flex;
        align-items: center;
      }

      .logo-plus {
        color: #2563eb;
        font-size: 24px;
        font-weight: bold;
        margin-right: 8px;
      }

      .logo-text {
        color: #1f2937;
        font-size: 24px;
        font-weight: bold;
      }

      .footer-navigation {
        display: flex;
        gap: 80px;
      }

      .footer-column {
        min-width: 160px;
      }

      .column-title {
        color: #1f2937;
        font-weight: 600;
        margin-bottom: 15px;
        font-size: 16px;
      }

      .link-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .link-list li {
        margin-bottom: 10px;
      }

      .footer-link {
        color: #4b5563;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-link:hover {
        color: #2563eb;
      }

      .social-container {
        display: flex;
        gap: 15px;
      }

      .social-link {
        color: #6b7280;
        transition: transform 0.3s ease;
      }

      .social-link:hover {
        transform: scale(1.1);
      }

      .copyright {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
      }

      .copyright-text {
        color: #6b7280;
        margin-bottom: 10px;
      }

      .copyright-links {
        display: flex;
        justify-content: center;
        gap: 20px;
      }

      .copyright-link {
        color: #4b5563;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .copyright-link:hover {
        color: #2563eb;
      }

      @media (max-width: 768px) {
        .footer-content {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-navigation {
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }

        .footer-column {
          text-align: center;
        }

        .social-container {
          justify-content: center;
          margin-top: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Call CSS injection on component mount
  React.useEffect(() => {
    injectCSS();
  }, []);

  return (
    <footer className="medicare-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <span className="logo-plus">+</span>
            <span className="logo-text">Medicare</span>
          </div>

          {/* Navigation Columns */}
          <div className="footer-navigation">
            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="column-title">Quick Links</h4>
              <ul className="link-list">
                {['Home', 'About Us', 'Services', 'Blog'].map((text) => (
                  <li key={text}>
                    <a href="#" className="footer-link">{text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* I Want To */}
            <div className="footer-column">
              <h4 className="column-title">I want to</h4>
              <ul className="link-list">
                {['Find a Doctor', 'Request an Appointment', 'Find a Location', 'Get an Opinion'].map((text) => (
                  <li key={text}>
                    <a href="#" className="footer-link">{text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-column">
              <h4 className="column-title">Support</h4>
              <ul className="link-list">
                {['Donate', 'Contact Us'].map((text) => (
                  <li key={text}>
                    <a href="#" className="footer-link">{text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="social-container">
            <a href="#" className="social-link"><Youtube color="#FF0000" size={24} /></a>
            <a href="#" className="social-link"><Twitter color="#1DA1F2" size={24} /></a>
            <a href="#" className="social-link"><Instagram color="#C13584" size={24} /></a>
            <a href="#" className="social-link"><Linkedin color="#0077B5" size={24} /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p className="copyright-text">Copyright © {new Date().getFullYear()} all rights reserved.</p>
          <div className="copyright-links">
            <a href="#" className="copyright-link">Privacy Policy</a>
            <a href="#" className="copyright-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MedicareFooter;