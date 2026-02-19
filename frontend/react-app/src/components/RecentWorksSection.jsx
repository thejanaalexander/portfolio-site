import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFavouriteProjects } from '../api';
import ProjectDetailModal from './ProjectDetailModal';
import './RecentWorksSection.scss';

const RecentWorksSection = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getFavouriteProjects();
                setProjects(res.data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
        fetchProjects();
    }, []);

    // Split projects into two rows for marquee effect
    const mid = Math.ceil(projects.length / 2);
    const row1 = projects.slice(0, mid);
    const row2 = projects.slice(mid);

    // Duplicate for seamless loop
    const loopedRow1 = [...row1, ...row1];
    const loopedRow2 = [...row2, ...row2];

    return (
        <section className="recent-works-section" id="recent-works">
            <h2>
                RECENT <span className="highlight">WORKS</span>
            </h2>
            <div className="subtitle">EXPLORE MY LATEST PROJECTS</div>

            <div className="marquee-wrapper">
                {/* Row 1 - scrolls left */}
                <motion.div
                    className="marquee-row"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                >
                    {loopedRow1.map((project, index) => (
                        <div
                            key={`r1-${project.id}-${index}`}
                            className="project-card"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div
                                className="card-image"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />
                            <div className="card-overlay">
                                <h3>{project.title}</h3>
                                <p>{project.category}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Row 2 - scrolls right */}
                <motion.div
                    className="marquee-row"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
                >
                    {loopedRow2.map((project, index) => (
                        <div
                            key={`r2-${project.id}-${index}`}
                            className="project-card"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div
                                className="card-image"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />
                            <div className="card-overlay">
                                <h3>{project.title}</h3>
                                <p>{project.category}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default RecentWorksSection;
