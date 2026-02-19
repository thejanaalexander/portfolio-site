import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShareAlt, FaPalette, FaCode, FaBullhorn } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import './ExpertiseSection.scss';

const expertiseData = [
    {
        id: 1,
        number: '01',
        title: 'Social Media',
        description: 'Engaging, high-conversion visual content tailored for your brand\'s social presence. We craft stories that resonate.',
        icon: <FaShareAlt />,
        color: '#FF0055', // Pink/Red
        bgGradient: 'linear-gradient(135deg, #FF0055 0%, #80002A 100%)'
    },
    {
        id: 2,
        number: '02',
        title: 'Graphic Design',
        description: 'Futuristic and impactful graphic design that defines your visual identity. Logos, branding, and marketing materials.',
        icon: <FaPalette />,
        color: '#00CCFF', // Cyan
        bgGradient: 'linear-gradient(135deg, #00CCFF 0%, #006680 100%)'
    },
    {
        id: 3,
        number: '03',
        title: 'Web Developing',
        description: 'Robust, scalable, and visually stunning web applications built with modern tech stacks like React, Node.js, and more.',
        icon: <FaCode />,
        color: '#00FF88', // Green
        bgGradient: 'linear-gradient(135deg, #00FF88 0%, #008044 100%)'
    },
    {
        id: 4,
        number: '04',
        title: 'Digital Marketing',
        description: 'Data-driven strategies to amplify your reach and dominate the digital landscape. SEO, SEM, and growth hacking.',
        icon: <FaBullhorn />,
        color: '#AA00FF', // Purple
        bgGradient: 'linear-gradient(135deg, #AA00FF 0%, #550080 100%)'
    }
];

const ExpertiseSection = () => {
    const [activeId, setActiveId] = useState(1);

    const handlePanelClick = (id) => {
        setActiveId(id);
    };

    return (
        <section className="expertise-section" id="expertise">
            <ScrollReveal>
                <h2>My <span className="highlight">Expertise</span></h2>
                <p className="subtitle">Showcasing my skills and professional services.</p>

                <div className="accordion-container">
                    {expertiseData.map((item) => (
                        <div
                            key={item.id}
                            className={`accordion-panel ${activeId === item.id ? 'active' : ''}`}
                            onClick={() => handlePanelClick(item.id)}
                            style={{ background: item.bgGradient }}
                        >
                            {/* Collapsed Content (Vertical Text) */}
                            <div className={`collapsed-label ${activeId === item.id ? 'hidden' : ''}`}>
                                <span className="number">{item.number}</span>
                                <span className="title">{item.title}</span>
                            </div>

                            {/* Expanded Content */}
                            <div className={`panel-content ${activeId === item.id ? 'visible' : ''}`}>
                                <div className="panel-number-lg">{item.number}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <button className="learn-more-btn">
                                    See Projects
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ExpertiseSection;
