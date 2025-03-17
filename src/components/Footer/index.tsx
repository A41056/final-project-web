import React from "react";
import { icons } from "../../assets/icons";

const Footer = () => {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="newsletter">
        <div className="newsletter-content">
          <h2>
            STAY UP TO DATE ABOUT
            <br />
            OUR LATEST OFFERS
          </h2>
        </div>
        <div className="subscribe">
          <div className="input-container">
            <img src={icons.mailBox} alt="Mail Icon" />
            <input type="email" placeholder="Enter your email address" />
          </div>

          <button className="text-zinc-400">Subscribe to Newsletter</button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="footer-section about">
          <h3>SHOP.CO</h3>
          <p>
            We have clothes that suit your style and which you're proud to wear.
            From women to men.
          </p>
          <div className="social-icons">
            <button className="social-icon">
              <img src={icons.twitter} alt="Twitter" />
            </button>
            <button className="black-social-icon">
              <img src={icons.facebook} alt="Facebook" />
            </button>
            <button className="social-icon">
              <img src={icons.instagram} alt="Instagram" />
            </button>
            <button className="social-icon">
              <img src={icons.github} alt="GitHub" />
            </button>
          </div>
        </div>

        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>HELP</h4>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>FAQ</h4>
          <ul>
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>RESOURCES</h4>
          <ul>
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="payment-icons">
          <button className="payment-icon">
            <img src={icons.visa} alt="Visa" />
          </button>
          <button className="payment-icon">
            <img src={icons.masterCard} alt="MasterCard" />
          </button>
          <button className="payment-icon">
            <img src={icons.paypal} alt="PayPal" />
          </button>
          <button className="payment-icon">
            <img src={icons.applePay} alt="Apple Pay" />
          </button>
          <button className="payment-icon">
            <img src={icons.googlePay} alt="Google Pay" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
