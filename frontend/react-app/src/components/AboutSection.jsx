import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.scss';

const AboutSection = ({ compact = false }) => {
    // Animation Variants
    const slideFromLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideFromRight = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const skills = [
        "GRAPHIC DESIGNING", "VIDEO EDITING", "WEB DEVELOPING", "SOCIAL MEDIA MARKETING", "AI PROMPTING",
        "GRAPHIC DESIGNING", "VIDEO EDITING", "WEB DEVELOPING", "SOCIAL MEDIA MARKETING", "AI PROMPTING",
        "GRAPHIC DESIGNING", "VIDEO EDITING", "WEB DEVELOPING", "SOCIAL MEDIA MARKETING", "AI PROMPTING"
    ];

    // Spotlight Logic
    const sectionRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
        sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            className={`about-section ${compact ? 'about-section--compact' : ''}`}
            id="about"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Background Layer */}
            <div className="spotlight-bg"></div>

            <div className="about-container">
                {!compact && (
                    <motion.div
                        className="about-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ staggerChildren: 0.2 }}
                    >
                        <motion.h2 className="main-title" variants={slideFromLeft}>
                            WHERE <br />
                            <span className="gradient-text">CREATIVITY</span> <br />
                            MEETS <br />
                            <span className="gradient-text">STRATEGY</span>
                        </motion.h2>

                        <motion.p className="slogan" variants={slideFromLeft}>
                            DESIGNING VISUALS, STORIES, AND SOLUTIONS THAT INSPIRE
                        </motion.p>
                    </motion.div>
                )}

                {/* Right Column: Description Text & CTA */}
                <motion.div
                    className="about-right"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
                >
                    <motion.div className="text-content" variants={slideFromRight}>
                        <p className="bio-text">
                            I am a results-driven Multimedia Designer and Web Developer with a passion for building seamless digital experiences and optimizing creative workflows. Currently an Undergraduate in Software Engineering, I specialize in a diverse range of technical and creative disciplines, including web development (HTML, PHP, MySQL, WordPress), graphic design, and professional video editing.
                        </p>
                        <p className="bio-text">
                            I have a proven track record of managing end-to-end digital content for international and local brands, ensuring all visual materials meet high communication standards. My expertise extends to process automation and AI-assisted workflows, using tools like Make.com to enhance productivity and accuracy in digital operations.
                        </p>
                        <p className="bio-text">
                            Driven by a background in competitive athletics and cadeting, I bring a high level of discipline, leadership, and attention to detail to every project. I am dedicated to delivering high-quality, innovative solutions that help brands thrive in the digital landscape.
                        </p>
                    </motion.div>

                    <motion.div className="cta-wrapper" variants={slideFromRight}>
                        <div className="cta-line"></div>
                        <a href="#portfolio" className="cta-link">
                            <span className="icon-circle">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            SEE MORE
                        </a>
                    </motion.div>
                </motion.div>

                {/* Skills Marquee (Moved inside container) */}
                <div className="skills-marquee">
                    <div className="marquee-track">
                        {skills.map((skill, index) => (
                            <span key={index} className="skill-item">
                                <span className="separator">✦</span> {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
