import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLightbulb, FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import './WorkflowSection.scss';

const steps = [
    {
        id: 1,
        title: "Discovery",
        desc: "Understanding your vision, goals, and target audience to build a solid foundation.",
        icon: <FaSearch />
    },
    {
        id: 2,
        title: "Strategy",
        desc: "Mapping out the user journey and technical architecture for seamless execution.",
        icon: <FaLightbulb />
    },
    {
        id: 3,
        title: "Design",
        desc: "Crafting high-fidelity visuals and interactive prototypes that captivate users.",
        icon: <FaPaintBrush />
    },
    {
        id: 4,
        title: "Development",
        desc: "Building clean, scalable code and integrating robust APIs for optimal performance.",
        icon: <FaCode />
    },
    {
        id: 5,
        title: "Launch",
        desc: "Testing, optimizing, and deploying your project to the world with confidence.",
        icon: <FaRocket />
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

const WorkflowSection = () => {
    return (
        <section className="workflow-section" id="process">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                My <span className="highlight">Process</span>
            </motion.h2>

            <motion.div
                className="timeline-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
            >
                {/* Connecting Line handled via CSS ::before */}

                {steps.map((step) => (
                    <motion.div
                        key={step.id}
                        className="workflow-step"
                        variants={itemVariants}
                    >
                        <div className="icon-container">
                            <div className="icon">{step.icon}</div>
                        </div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default WorkflowSection;
