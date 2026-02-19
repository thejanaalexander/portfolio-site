import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import './TestimonialsSection.scss';
import { getTestimonials } from '../api';

const cardVariants = {
    center: {
        x: '-50%',
        y: '-50%',
        scale: 1,
        opacity: 1,
        zIndex: 10,
        filter: "blur(0px)",
        transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }
    },
    left: {
        x: '-140%', // pushed left
        y: '-50%',
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
        filter: "blur(2px)",
        transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }
    },
    right: {
        x: '40%', // pushed right (-50% + 90%)
        y: '-50%',
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
        filter: "blur(2px)",
        transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }
    },
    hidden: {
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 0,
        zIndex: 0,
        transition: { duration: 0.3 }
    }
};

const TestimonialsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await getTestimonials();
                setReviews(res.data);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        if (!isAutoPlaying || reviews.length === 0) return;
        const interval = setInterval(() => {
            handleNext();
        }, 2500);
        return () => clearInterval(interval);
    }, [activeIndex, isAutoPlaying, reviews]);

    const handleNext = () => {
        if (reviews.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        if (reviews.length === 0) return;
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const getCardPosition = (index) => {
        const len = reviews.length;
        if (len === 0) return 'hidden';

        // Calculate relative difference (handled for loop)
        const diff = (index - activeIndex + len) % len;

        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        if (diff === len - 1) return 'left';

        // Handling for "smooth" immediate transitions if jumping
        return 'hidden';
    };

    if (reviews.length === 0) {
        return (
            <section className="testimonials-section" id="testimonials">
                <ScrollReveal>
                    <h2>Client <span className="highlight">Stories</span></h2>
                    <p className="subtitle">No testimonials yet.</p>
                </ScrollReveal>
            </section>
        )
    }

    return (
        <section className="testimonials-section" id="testimonials">
            <ScrollReveal>
                <h2>Client <span className="highlight">Stories</span></h2>
                <p className="subtitle">Feedback from the people I've collaborated with.</p>

                <div
                    className="carousel-wrapper"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <AnimatePresence>
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                className="review-card"
                                initial="hidden"
                                animate={getCardPosition(index)}
                                variants={cardVariants}
                                onClick={() => {
                                    const pos = getCardPosition(index);
                                    if (pos === 'left') handlePrev();
                                    if (pos === 'right') handleNext();
                                }}
                            >
                                <FaQuoteLeft className="quote-icon" />
                                <p className="review-text">"{review.text}"</p>

                                <div className="client-info">
                                    {review.image ? (
                                        <img src={review.image} alt={review.name} className="avatar-img" />
                                    ) : (
                                        <div className="avatar">{review.name.charAt(0)}</div>
                                    )}
                                    <div className="details">
                                        <h4>{review.name}</h4>
                                        <span>{review.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TestimonialsSection;
