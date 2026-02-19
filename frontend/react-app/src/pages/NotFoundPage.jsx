import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <section className="not-found-page">
            <SEO
                title="404 | Page Not Found"
                description="The page you are looking for does not exist."
            />
            {/* Floating grid lines in the background */}
            <div className="grid-bg" />

            {/* Glitch 404 */}
            <motion.div
                className="glitch-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="glitch" data-text="404">404</h1>
            </motion.div>

            <motion.p
                className="error-label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                PAGE NOT FOUND
            </motion.p>

            <motion.p
                className="error-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                The page you're looking for has been lost in the digital void.
            </motion.p>

            <motion.div
                className="actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Link to="/" className="home-btn">
                    <span className="btn-text">RETURN HOME</span>
                    <span className="btn-glitch" />
                </Link>
                <Link to="/contact" className="contact-btn">
                    CONTACT ME
                </Link>
            </motion.div>

            {/* Decorative scanlines */}
            <div className="scanlines" />
        </section>
    );
};

export default NotFoundPage;
