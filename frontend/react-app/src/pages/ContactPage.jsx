import React, { useEffect } from 'react';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';

const ContactPage = () => {
    // Ensure we start at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="contact-page">
            <SEO
                title="Contact | Let's Create Something"
                description="Get in touch for collaborations, freelance projects, or just to say hi. Let's build something amazing together."
            />
            <ContactSection />
        </div>
    );
};

export default ContactPage;
