import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './ProjectDetailModal.scss';

const ProjectDetailModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Combine main image and gallery into one list for the carousel
    const images = [
        ...(project.image ? [project.image] : []),
        ...(project.gallery || [])
    ];

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const showNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const showPrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const isVideo = (url) => {
        if (!url) return false;
        const extension = url.split('.').pop().toLowerCase();
        return ['mp4', 'webm', 'ogg', 'mov'].includes(extension);
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="project-detail-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="project-detail-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>

                    <div className="modal-content">
                        {/* Left Side: Media Carousel */}
                        <div className="modal-media">
                            {images.length > 0 ? (
                                <>
                                    <div className="main-image-container">
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                {isVideo(images[currentImageIndex]) ? (
                                                    <video
                                                        src={images[currentImageIndex]}
                                                        controls
                                                        autoPlay
                                                        loop
                                                        style={{ maxWidth: '100%', maxHeight: '70vh' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={images[currentImageIndex]}
                                                        alt={`Project view ${currentImageIndex + 1}`}
                                                    />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                        {images.length > 1 && (
                                            <div className="carousel-controls">
                                                <button className="nav-btn prev" onClick={showPrev}>&#10094;</button>
                                                <button className="nav-btn next" onClick={showNext}>&#10095;</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {images.length > 1 && (
                                        <div className="gallery-thumbnails">
                                            {images.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                >
                                                    {isVideo(img) ? (
                                                        <video src={img} muted style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                                    ) : (
                                                        <img src={img} alt={`Thumbnail ${index}`} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="no-media">No images available</div>
                            )}
                        </div>

                        {/* Right Side: Info */}
                        <div className="modal-info">
                            <span className="category">{project.category}</span>
                            <h2>{project.title}</h2>

                            <div className="description">
                                <p>{project.description}</p>
                            </div>

                            <div className="technologies">
                                <h3>Technologies</h3>
                                <div className="tech-tags">
                                    {project.technologies?.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-links">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn primary">
                                        Live Demo <FaExternalLinkAlt />
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn secondary">
                                        GitHub <FaGithub />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
