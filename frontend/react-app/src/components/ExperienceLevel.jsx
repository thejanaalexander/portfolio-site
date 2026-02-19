import React from 'react';
import { motion } from 'framer-motion';
import { FaBezierCurve, FaFilm, FaCode, FaBullhorn, FaCamera } from 'react-icons/fa';
import './ExperienceLevel.scss';

const experienceLevels = [
    { skill: "Graphic Design", percent: 80, years: "5 Years", icon: <FaBezierCurve />, color: "#A855F7" },
    { skill: "Video Editing", percent: 75, years: "4 Years", icon: <FaFilm />, color: "#0ac0df" },
    { skill: "Web Development", percent: 75, years: "3 Years", icon: <FaCode />, color: "#10B981" },
    { skill: "Social Media Marketing", percent: 50, years: "1 Year", icon: <FaBullhorn />, color: "#F59E0B" },
    { skill: "Photography", percent: 80, years: "5 Years", icon: <FaCamera />, color: "#EC4899" },
];

const ExperienceLevel = () => {
    return (
        <section className="experience-level-section">
            <motion.div
                className="experience-level-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2>
                    MY <span className="accent">EXPERTISE</span> LEVEL
                </h2>
                <p className="subtitle">Years of hands-on experience across creative & technical domains</p>
            </motion.div>

            <motion.div
                className="experience-bars-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } }
                }}
            >
                {experienceLevels.map((item, index) => (
                    <motion.div
                        key={index}
                        className="experience-bar-item"
                        variants={{
                            hidden: { opacity: 0, x: -40 },
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
        </section>
    );
};

export default ExperienceLevel;
