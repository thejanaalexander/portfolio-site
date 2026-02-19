import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaFigma, FaWordpress, FaHtml5, FaPhp, FaReact
} from 'react-icons/fa';
import {
    SiAdobephotoshop, SiAdobepremierepro, SiAdobeillustrator,
    SiAdobeaftereffects, SiCanva, SiMysql, SiOpenai
} from 'react-icons/si';
import './AboutPageContent.scss';
import { getCvInfo } from '../api';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

const IconImg = ({ src, alt }) => (
    <img src={src} alt={alt} style={{ width: '1.6rem', height: '1.6rem', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
);

const softwareSkills = [
    { icon: <SiAdobephotoshop />, label: "Photoshop", color: "#31A8FF" },
    { icon: <SiAdobeillustrator />, label: "Illustrator", color: "#FF9A00" },
    { icon: <SiAdobepremierepro />, label: "Premiere Pro", color: "#9999FF" },
    { icon: <SiAdobeaftereffects />, label: "After Effects", color: "#9999FF" },
    { icon: <FaFigma />, label: "Figma", color: "#F24E1E" },
    { icon: <IconImg src="/icons/capcut.svg" alt="CapCut" />, label: "CapCut", color: "#FFFFFF" },
    { icon: <SiCanva />, label: "Canva", color: "#00C4CC" },
    { icon: <FaHtml5 />, label: "HTML/CSS", color: "#E34F26" },
    { icon: <FaPhp />, label: "PHP", color: "#777BB4" },
    { icon: <SiMysql />, label: "MySQL", color: "#4479A1" },
    { icon: <FaReact />, label: "React", color: "#61DAFB" },
    { icon: <FaWordpress />, label: "WordPress", color: "#21759B" },
    { icon: <IconImg src="/icons/leonardo.svg" alt="Leonardo AI" />, label: "Leonardo AI", color: "#A855F7" },
    { icon: <IconImg src="/icons/nanobanana.svg" alt="Nano Banana" />, label: "Nano Banana", color: "#FACC15" },
    { icon: <IconImg src="/icons/veo3.svg" alt="Veo 3" />, label: "Veo 3", color: "#4285F4" },
    { icon: <IconImg src="/icons/midjourney.svg" alt="Midjourney" />, label: "Midjourney", color: "#FFFFFF" },
    { icon: <SiOpenai />, label: "ChatGPT", color: "#10A37F" },
];


const AboutPageContent = () => {
    const [cvUrl, setCvUrl] = useState(null);

    useEffect(() => {
        getCvInfo().then(res => {
            if (res.data.exists) {
                setCvUrl(`http://localhost:5000${res.data.url}`);
            }
        }).catch(() => { });
    }, []);

    return (
        <section className="about-page-content">
            <div className="about-card">
                {/* Left: Photo */}
                <motion.div
                    className="about-photo-side"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="photo-wrapper">
                        <img src="/images/about-profile.png" alt="Profile" />
                    </div>
                    {cvUrl && (
                        <motion.a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-cv-btn"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            DOWNLOAD MY CV
                        </motion.a>
                    )}
                </motion.div>

                {/* Right: About Me Text */}
                <motion.div
                    className="about-info-side"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <motion.div
                        className="info-section"
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                        }}
                    >
                        <h3 className="section-heading">About Me</h3>
                        <motion.p
                            className="about-text"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.1 } } }}
                        >
                            I am a results-driven Multimedia Designer and Web Developer with a passion for building seamless digital experiences and optimizing creative workflows. Currently an Undergraduate in Software Engineering, I specialize in a diverse range of technical and creative disciplines, including web development (HTML, PHP, MySQL, WordPress), graphic design, and professional video editing.
                        </motion.p>
                        <motion.p
                            className="about-text"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } } }}
                        >
                            I have a proven track record of managing end-to-end digital content for international and local brands, ensuring all visual materials meet high communication standards. My expertise extends to process automation and AI-assisted workflows, using tools like Make.com to enhance productivity and accuracy in digital operations.
                        </motion.p>
                        <motion.p
                            className="about-text"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } }}
                        >
                            Driven by a background in competitive athletics and cadeting, I bring a high level of discipline, leadership, and attention to detail to every project. I am dedicated to delivering high-quality, innovative solutions that help brands thrive in the digital landscape.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Full-width: Softwares & Technologies */}
                <motion.div
                    className="info-section skills-full-width"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                >
                    <h3 className="section-heading" style={{ fontSize: '1.3rem' }}>Softwares & Technologies</h3>
                    <motion.div
                        className="skills-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.04 } }
                        }}
                    >
                        {softwareSkills.map((skill, i) => (
                            <motion.div
                                key={i}
                                className="skill-icon-item"
                                title={skill.label}
                                variants={{
                                    hidden: { opacity: 0, y: 20, scale: 0.8 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
                                }}
                            >
                                <span className="skill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </span>
                                <span className="skill-label">{skill.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPageContent;
