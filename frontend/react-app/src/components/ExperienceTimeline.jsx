import React from 'react';
import { motion } from 'framer-motion';
import { FaBezierCurve, FaFilm, FaCode, FaBullhorn, FaCamera } from 'react-icons/fa';
import './ExperienceTimeline.scss';

const experiences = [
    {
        period: "2025 – Present",
        role: "Digital Content Creator & Web Developer",
        company: "Digital Sky (Pvt) Ltd",
    },
    {
        period: "2024 – 2025",
        role: "Graphic Designer",
        company: "Faith2Hope (Pvt) Ltd",
    },
    {
        period: "2024 – 2024",
        role: "Digital Content Executive",
        company: "Global Center for Executive Education",
    },
    {
        period: "2023 – 2025",
        role: "Web & Multimedia Designer",
        company: "Pengo (Pvt) Ltd",
    },
    {
        period: "2023 – 2024",
        role: "IT Support Executive",
        company: "UBit (Pvt) Ltd",
    },
    {
        period: "2023 – 2023",
        role: "IT Executive - Intern",
        company: "Jayasuriya Optical Services",
    },
    {
        period: "2019 – 2021",
        role: "Recovery Officer - Junior Executive",
        company: "Cashwagon (Pvt) Ltd",
    },
];

const experienceLevels = [
    { skill: "Graphic Design", percent: 80, years: "5 Years", icon: <FaBezierCurve />, color: "#A855F7" },
    { skill: "Video Editing", percent: 75, years: "4 Years", icon: <FaFilm />, color: "#0ac0df" },
    { skill: "Web Development", percent: 75, years: "3 Years", icon: <FaCode />, color: "#10B981" },
    { skill: "Social Media Marketing", percent: 50, years: "1 Year", icon: <FaBullhorn />, color: "#F59E0B" },
    { skill: "Photography", percent: 80, years: "5 Years", icon: <FaCamera />, color: "#EC4899" },
];

const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

const ExperienceTimeline = () => {
    return (
        <section className="experience-timeline">
            <div className="experience-two-col">
                {/* Left: Timeline */}
                <div className="timeline-col">
                    <motion.h2
                        className="timeline-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        WORK <span className="gradient-text">EXPERIENCE</span>
                    </motion.h2>
                    <div className="timeline-container">
                        <motion.div
                            className="timeline-line"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: 'top' }}
                        />
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.3 }}
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="timeline-dot"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                />
                                <div className="timeline-content">
                                    <span className="period">{exp.period}</span>
                                    <h3 className="role">{exp.role}</h3>
                                    <p className="company">{exp.company}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Experience Levels */}
                <motion.div
                    className="experience-levels"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12 } }
                    }}
                >
                    <motion.h3
                        className="levels-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                    >
                        EXPERTISE <span className="gradient-text">LEVEL</span>
                    </motion.h3>

                    {experienceLevels.map((item, index) => (
                        <motion.div
                            key={index}
                            className="exp-bar-item"
                            variants={{
                                hidden: { opacity: 0, x: 40 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                        >
                            <div className="bar-header">
                                <div className="skill-info">
                                    <span className="skill-icon" style={{ color: item.color }}>{item.icon}</span>
                                    <span className="skill-name">{item.skill}</span>
                                </div>
                                <div className="skill-meta">
                                    <span className="skill-years">{item.years}</span>
                                    <span className="skill-percent" style={{ color: item.color }}>{item.percent}%</span>
                                </div>
                            </div>
                            <div className="bar-track">
                                <motion.div
                                    className="bar-fill"
                                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.percent}%` }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                                >
                                    <div className="bar-glow" style={{ background: item.color }} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;

