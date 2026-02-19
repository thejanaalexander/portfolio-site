import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAnalytics } from '../api';
import { FaProjectDiagram, FaComments, FaStar, FaQuoteRight, FaCode, FaChartLine } from 'react-icons/fa';
import './AnalyticsDashboard.scss';

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await getAnalytics();
                setData(res.data);
            } catch (err) {
                console.error('Failed to fetch analytics', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return <div className="analytics-loading">Loading analytics...</div>;
    }

    if (!data) {
        return <div className="analytics-loading">No analytics data available.</div>;
    }

    const maxMessages = Math.max(...data.messageTrend.map(d => d.count), 1);
    const maxTech = Math.max(...(data.topTechnologies?.map(t => t.count) || [1]), 1);

    return (
        <div className="analytics-dashboard">
            {/* Summary Cards */}
            <div className="stats-grid">
                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                    <div className="stat-icon projects"><FaProjectDiagram /></div>
                    <div className="stat-info">
                        <span className="stat-number">{data.totals.projects}</span>
                        <span className="stat-label">PROJECTS</span>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="stat-icon testimonials"><FaQuoteRight /></div>
                    <div className="stat-info">
                        <span className="stat-number">{data.totals.testimonials}</span>
                        <span className="stat-label">TESTIMONIALS</span>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="stat-icon messages"><FaComments /></div>
                    <div className="stat-info">
                        <span className="stat-number">{data.totals.messages}</span>
                        <span className="stat-label">MESSAGES</span>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="stat-icon rating"><FaStar /></div>
                    <div className="stat-info">
                        <span className="stat-number">{data.avgRating}</span>
                        <span className="stat-label">AVG RATING</span>
                    </div>
                </motion.div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                {/* Message Trend Chart */}
                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h3><FaChartLine /> Messages (Last 7 Days)</h3>
                    <div className="bar-chart">
                        {data.messageTrend.map((day, i) => (
                            <div className="bar-column" key={i}>
                                <div className="bar-wrapper">
                                    <motion.div
                                        className="bar"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(day.count / maxMessages) * 100}%` }}
                                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                                    />
                                </div>
                                <span className="bar-label">
                                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                                </span>
                                <span className="bar-value">{day.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Projects by Category */}
                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h3><FaProjectDiagram /> Projects by Category</h3>
                    <div className="category-list">
                        {data.projectsByCategory.map((cat, i) => (
                            <div className="category-row" key={i}>
                                <span className="category-name">{cat.category}</span>
                                <div className="category-bar-track">
                                    <motion.div
                                        className="category-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(cat.count / data.totals.projects) * 100}%` }}
                                        transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                                    />
                                </div>
                                <span className="category-count">{cat.count}</span>
                            </div>
                        ))}
                        {data.projectsByCategory.length === 0 && (
                            <p className="empty-text">No projects yet</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="charts-row">
                {/* Top Technologies */}
                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <h3><FaCode /> Top Technologies</h3>
                    <div className="tech-grid">
                        {data.topTechnologies?.map((tech, i) => (
                            <div className="tech-item" key={i}>
                                <div className="tech-bar-track">
                                    <motion.div
                                        className="tech-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(tech.count / maxTech) * 100}%` }}
                                        transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
                                    />
                                </div>
                                <div className="tech-info">
                                    <span className="tech-name">{tech.name}</span>
                                    <span className="tech-count">{tech.count}</span>
                                </div>
                            </div>
                        ))}
                        {(!data.topTechnologies || data.topTechnologies.length === 0) && (
                            <p className="empty-text">No technology data</p>
                        )}
                    </div>
                </motion.div>

                {/* Rating Distribution */}
                <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <h3><FaStar /> Rating Distribution</h3>
                    <div className="rating-dist">
                        {[5, 4, 3, 2, 1].map(star => {
                            const item = data.ratingDistribution?.find(r => r.rating === star);
                            const count = item ? parseInt(item.count) : 0;
                            const total = data.totals.testimonials || 1;
                            return (
                                <div className="rating-row" key={star}>
                                    <span className="rating-stars">
                                        {star} <FaStar className="star-icon" />
                                    </span>
                                    <div className="rating-bar-track">
                                        <motion.div
                                            className="rating-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(count / total) * 100}%` }}
                                            transition={{ delay: 0.8 + (5 - star) * 0.08, duration: 0.4 }}
                                        />
                                    </div>
                                    <span className="rating-count">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
