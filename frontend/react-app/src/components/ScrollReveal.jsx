import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps content in a Framer Motion div that animates when entering validity.
 * Ensures animations re-trigger when scrolling back into view (once: false).
 * 
 * @param {object} children - Content to wrap
 * @param {object} variants - Animation variants (hidden/visible)
 * @param {string} className - Optional styling classes
 * @param {float} amount - Viewport amount (0.0 - 1.0)
 * @param {float} delay - Delay for child animations
 */
const ScrollReveal = ({
    children,
    variants,
    className = "",
    amount = 0.3,
    delay = 0
}) => {

    // Default variants if none provided
    const defaultVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: amount }} // Critical: once: false
            transition={{ staggerChildren: 0.1, delayChildren: delay }}
            variants={variants || defaultVariants}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
