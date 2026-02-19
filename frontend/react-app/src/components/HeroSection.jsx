import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal'; // Import new component
import './HeroSection.scss';

// ... (useCounter hook code remains same - omitted for brevity in tool call description if file tool allows partial edits but replace tool needs full block if targeting)
// Actally replace_file_content needs contigous block. Expanding context.

// Placeholder hook for counting animation
const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
};

const HeroSection = () => {
    // Parallax & Spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - top;

        mouseX.set(clientX - window.innerWidth / 2);
        mouseY.set(clientY - window.innerHeight / 2);
        spotlightX.set(x);
        spotlightY.set(y);
    };

    const bgX = useTransform(mouseX, [-500, 500], [-20, 20]);
    const bgY = useTransform(mouseY, [-500, 500], [-20, 20]);

    // Logo Carousel Data
    const logos = [
        "/images/logos/logo-1.png",
        "/images/logos/logo-2.png",
        "/images/logos/logo-3.png",
        "/images/logos/logo-1.png", // Repeats for seamless look
        "/images/logos/logo-2.png",
    ];

    // Stats
    const yearsExp = useCounter(8);
    const projects = useCounter(100);
    const clients = useCounter(100);

    // Animation Variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { // Renamed from show
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    const fadeInUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } // Renamed from show
    };

    const glitchVariant = {
        hidden: { opacity: 0, x: -10 },
        visible: { // Renamed from show
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const spotlight = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(105, 41, 242, 0.15), transparent 80%)`
    );

    return (
        <section className="hero-section" onMouseMove={handleMouseMove}>
            {/* Interactive Background */}
            <motion.div
                className="hero-spotlight"
                style={{ background: spotlight }}
            />
            <motion.div
                className="hero-bg-parallax"
                style={{ x: bgX, y: bgY }}
            />


            <div className="hero-content">
                {/* Left Content */}
                <ScrollReveal
                    className="hero-text"
                    variants={staggerContainer}
                // initial="hidden" // Handled by ScrollReveal
                // animate="show" // Handled by ScrollReveal (as whileInView)
                // We need to ensure ScrollReveal uses 'show' as visible variant key or mapped correctly.
                // ScrollReveal uses 'visible'. staggerContainer uses 'show'.
                // Let's stick to passing variants but we need to rename 'show' to 'visible' in variants or update ScrollReveal logic?
                // Simpler: Just rename variants here.
                >
                    <motion.div className="greeting" variants={fadeInUp}>
                        Hello I'm <motion.span
                            className="name-highlight"
                            animate={{ opacity: [0.8, 1, 0.8], textShadow: ["0 0 10px #0ac0df", "0 0 20px #0ac0df", "0 0 10px #0ac0df"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Alex
                        </motion.span>
                    </motion.div>

                    <motion.h1 className="main-heading" variants={glitchVariant}>
                        Digital Creator
                    </motion.h1>

                    <motion.p className="description" variants={fadeInUp}>
                        Empowering businesses with beautiful front-end designs, robust web solutions, engaging video content, and strong social media strategies.
                    </motion.p>

                    <motion.div className="cta-group" variants={fadeInUp}>
                        <Link to="/portfolio">
                            <motion.button
                                className="btn-primary"
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(192, 56, 211, 0.6)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Portfolio
                            </motion.button>
                        </Link>
                        <Link to="/contact">
                            <motion.button
                                className="btn-secondary"
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(105, 41, 242, 0.6)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Let's Talk
                            </motion.button>
                        </Link>
                    </motion.div>
                </ScrollReveal>

                {/* Right Content: Stats (Moved to side as requested but responsive) */}
                <ScrollReveal
                    className="hero-sidebar"
                    variants={{
                        hidden: { x: 100, opacity: 0 },
                        visible: {
                            x: 0,
                            opacity: 1,
                            transition: { staggerChildren: 0.2, delayChildren: 1 }
                        }
                    }}
                >
                    <motion.div
                        className="stat-box"
                        variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    >
                        <div className="stat-number">+{yearsExp < 10 ? `0${yearsExp}` : yearsExp}</div>
                        <div className="stat-label">Years of Experience</div>
                    </motion.div>
                    <motion.div
                        className="stat-box"
                        variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    >
                        <div className="stat-number">+{projects}</div>
                        <div className="stat-label">Completed Projects</div>
                    </motion.div>
                    <motion.div
                        className="stat-box"
                        variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                    >
                        <div className="stat-number">+{clients}</div>
                        <div className="stat-label">Satisfied Clients</div>
                    </motion.div>
                </ScrollReveal>

                {/* Right Side: Image */}
                <div className="hero-image-wrapper">
                    <ScrollReveal variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
                        <motion.div
                            className="image-glow"
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.img
                            src="/images/profile-photo.png"
                            alt="Alex - Digital Creator"
                            animate={{ y: [-15, 15, -15] }} // Floating loop persists
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </ScrollReveal>
                </div>


            </div>

            {/* Footer / Logos */}
            <div className="hero-footer">
                <div className="logo-carousel">
                    <motion.div
                        className="carousel-track"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Duplicating array for infinite effect simulation */}
                        {[...logos, ...logos, ...logos].map((logo, index) => (
                            <img key={index} src={logo} alt="Company Logo" />
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="icon">↓</div>
                    <span>SCROLL DOWN</span>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
