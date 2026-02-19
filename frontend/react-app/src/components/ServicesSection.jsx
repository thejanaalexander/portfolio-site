import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCheck, FaBezierCurve, FaFilm, FaBullhorn, FaRobot, FaCamera } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import './ServicesSection.scss';

const services = [
    {
        id: 1,
        title: "Graphic Designing",
        desc: "Visual storytelling that captivates your audience and defines your brand identity.",
        icon: <FaBezierCurve />,
        features: ["Logo & Branding", "Social Media Graphics", "Print Design", "UI Concepts"]
    },
    {
        id: 2,
        title: "Video Editing",
        desc: "Transforming raw footage into cinematic masterpieces with professional cuts and effects.",
        icon: <FaFilm />,
        features: ["Cinematic Editing", "Color Grading", "Motion Graphics", "Sound Design"]
    },
    {
        id: 3,
        title: "Web Development",
        desc: "Building high-performance, responsive websites and web applications.",
        icon: <FaCode />,
        features: ["React & Next.js", "Responsive Layouts", "Performance Optimization", "SEO Friendly"]
    },
    {
        id: 4,
        title: "Social Media Marketing",
        desc: "Strategic campaigns to boost your online presence and engage your target audience.",
        icon: <FaBullhorn />,
        features: ["Content Strategy", "Campaign Management", "Analytics & Reporting", "Community Growth"]
    },
    {
        id: 5,
        title: "AI Video Advertising",
        desc: "Leveraging cutting-edge AI to create high-impact video ads that convert.",
        icon: <FaRobot />,
        features: ["AI-Generated Visuals", "Smart Targeting", "Rapid Production", "Data-Driven Creatives"]
    },
    {
        id: 6,
        title: "Product Photography",
        desc: "Stunning commercial photography that showcases your products in the best light.",
        icon: <FaCamera />,
        features: ["High-Res Shooting", "Professional Lighting", "Creative Direction", "Post-Processing"]
    }
];

const ServicesSection = () => {
    // Duplicate services for infinite loop effect
    const loopedServices = [...services, ...services];

    return (
        <section className="services-section" id="services">


            <ScrollReveal>
                <div className="services-container">
                    <div className="services-track">
                        {loopedServices.map((service, index) => (
                            <div
                                key={`${service.id}-${index}`}
                                className="service-card"
                            >
                                <div className="icon-wrapper">
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <p className="description">{service.desc}</p>

                                <ul className="features-list">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <FaCheck className="check-icon" /> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="cta-btn">Get Started</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ServicesSection;
