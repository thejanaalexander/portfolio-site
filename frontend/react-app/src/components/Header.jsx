import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
        >
            <div className="header-container">
                <Link to="/" className="logo">
                    <div className="logo-icon"></div>
                    <span>PORTFOLIO</span>
                </Link>

                <nav className="nav-menu">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                    <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
                    <a href="/#skills">Skills</a>
                    <Link to="/contact">
                        <motion.button
                            className="btn-talk"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 0px 15px rgba(10, 192, 223, 0.6)",
                                backgroundColor: "#5419d8"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let's Talk
                        </motion.button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
