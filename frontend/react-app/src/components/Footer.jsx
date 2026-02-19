import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="#">Terms of Service</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Alex. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
