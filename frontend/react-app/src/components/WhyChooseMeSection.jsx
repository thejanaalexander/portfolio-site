import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import './WhyChooseMeSection.scss';

const WhyChooseMeSection = () => {
    const cards = [
        {
            id: 1,
            title: 'CREATIVE & STRATEGIC',
            subtitle: 'APPROACH',
            image: '/images/choose/creative.png',
        },
        {
            id: 2,
            title: 'CLEAN, MODERN',
            subtitle: 'DESIGN STYLE',
            image: '/images/choose/modern.png',
        },
        {
            id: 3,
            title: 'MULTI-SKILL',
            subtitle: 'EXPERTISE',
            image: '/images/choose/multiskill.png',
        },
        {
            id: 4,
            title: 'RELIABLE & ON-TIME',
            subtitle: 'DELIVERY',
            image: '/images/choose/reliable.png',
        },
    ];

    return (
        <section className="why-choose-me-section" id="why-choose-me">
            <div className="choose-container">
                <ScrollReveal>
                    <div className="header-group">
                        <h2 className="section-title">
                            WHY <span className="highlight">BRANDS</span> <span className="highlight-2">CHOOSE</span> ME
                        </h2>
                        <p className="subtitle">
                            QUALITY, CONSISTENCY, AND CREATIVITY YOU CAN TRUST.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="cards-grid">
                    {cards.map((card, index) => (
                        <ScrollReveal key={card.id} delay={index * 0.1}>
                            <motion.div
                                className="choose-card"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="card-image">
                                    <img src={card.image} alt={`${card.title} ${card.subtitle}`} />
                                    <div className="card-overlay"></div>
                                </div>
                                <div className="card-content">
                                    <h3>{card.title}</h3>
                                    <h3>{card.subtitle}</h3>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseMeSection;
