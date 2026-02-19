import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../api';
import ProjectDetailModal from '../components/ProjectDetailModal';
import './PortfolioPage.scss';

const PortfolioPage = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedProject, setSelectedProject] = useState(null);

    // Dynamic filters based on fetched projects
    const filters = ['ALL', ...new Set(projects.map(project => project.category))];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getProjects();
                setProjects(res.data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeFilter === 'ALL'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <div className="portfolio-page">
            <SEO
                title="Portfolio | My Creative Works"
                description="Browse my portfolio of web development, design, and digital projects. See how I bring ideas to life."
            />
            {/* 1. Header Area */}
            <header className="portfolio-header">
                <h2>EXPLORE MY <span className="highlight">WORKS</span></h2>
                <div className="subtitle">
                    DESCRIPTION
                </div>
            </header>

            {/* 2. Main Layout (Two Columns) */}
            <div className="portfolio-content">
                {/* 3. Left Sidebar (Sticky Filter Navigation) */}
                <aside className="portfolio-sidebar">
                    <nav className="filter-menu">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* 4. Right Area (Project Grid) */}
                <main className="portfolio-grid">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="project-card"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* 5. Project Card Design */}
                                <div className="image-wrapper">
                                    <img src={project.image} alt={project.title} />
                                </div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </main>
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

        </div >
    );
};

export default PortfolioPage;
