import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFigma, SiMongodb, SiPython, SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects } from 'react-icons/si';
import './SkillsSection.scss';

const skills = [
    { name: 'JavaScript', icon: <SiJavascript />, level: '95%' },
    { name: 'React', icon: <FaReact />, level: '90%' },
    { name: 'Node.js', icon: <FaNodeJs />, level: '85%' },
    { name: 'TypeScript', icon: <SiTypescript />, level: '80%' },
    { name: 'Python', icon: <SiPython />, level: '75%' },
    { name: 'MongoDB', icon: <SiMongodb />, level: '80%' },
    { name: 'Git', icon: <FaGitAlt />, level: '90%' },
    { name: 'Figma', icon: <SiFigma />, level: '85%' },
    { name: 'Photoshop', icon: <SiAdobephotoshop />, level: '90%' },
    { name: 'Illustrator', icon: <SiAdobeillustrator />, level: '85%' },
    { name: 'Premiere Pro', icon: <SiAdobepremierepro />, level: '80%' },
    { name: 'After Effects', icon: <SiAdobeaftereffects />, level: '75%' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const SkillsSection = () => {
    return (
        <section className="skills-section" id="skills">
            <div className="container">
                {/* Left Side: Content */}
                <motion.div
                    className="skills-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Discover <br /><span className="highlight">In-Demand Skills</span> <br />& Experience</h2>
                    <p>
                        Embark on a journey to explore sought-after skills and valuable experiences that set me apart.
                        From cutting-edge technologies to proven methodologies, my expertise is tailored to meet the demands of the ever-evolving digital landscape.
                    </p>
                    {/* Button Removed */}
                </motion.div>

                {/* Right Side: Grid */}
                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-card"
                            variants={itemVariants}
                        >
                            <div className="icon">{skill.icon}</div>
                            <h4>{skill.name}</h4>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;
