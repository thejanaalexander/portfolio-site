import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';
import './BackToTop.scss';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const mainEl = document.querySelector('.app-container main');
        const target = mainEl || window;

        const handleScroll = () => {
            const scrollY = mainEl ? mainEl.scrollTop : window.scrollY;
            setVisible(scrollY > 400);
        };

        target.addEventListener('scroll', handleScroll, { passive: true });
        return () => target.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const mainEl = document.querySelector('.app-container main');
        if (mainEl) {
            mainEl.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className="back-to-top"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaChevronUp />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
