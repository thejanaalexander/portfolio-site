import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.scss';

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShow(false);
                        setTimeout(() => onComplete(), 600);
                    }, 400);
                    return 100;
                }
                // Accelerating progress
                const increment = prev < 60 ? Math.random() * 8 + 3 : Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="splash-screen"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Grid background */}
                    <div className="splash-grid" />

                    {/* Center content */}
                    <div className="splash-content">
                        {/* Logo / Brand */}
                        <motion.div
                            className="splash-logo"
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="logo-icon">◆</span>
                        </motion.div>

                        <motion.h1
                            className="splash-brand"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            PORTFOLIO
                        </motion.h1>

                        <motion.p
                            className="splash-tagline"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            CREATIVE DIGITAL EXPERIENCES
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            className="splash-progress"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '200px' }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        >
                            <div className="progress-track">
                                <motion.div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="progress-text">{Math.round(progress)}%</span>
                        </motion.div>
                    </div>

                    {/* Decorative corner accents */}
                    <div className="corner-accent top-left" />
                    <div className="corner-accent top-right" />
                    <div className="corner-accent bottom-left" />
                    <div className="corner-accent bottom-right" />

                    {/* Scanlines */}
                    <div className="splash-scanlines" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
