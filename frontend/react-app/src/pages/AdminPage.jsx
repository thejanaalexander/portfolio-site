import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, deleteProject, getTestimonials, deleteTestimonial, getMessages, deleteMessage, getCvInfo, uploadCv, deleteCv, toggleFavourite } from '../api';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ProjectForm from '../components/ProjectForm';
import TestimonialForm from '../components/TestimonialForm';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import './AdminPage.scss';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'projects', 'testimonials', 'messages', 'cv'

    // Data States
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form States
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // CV States
    const [cvInfo, setCvInfo] = useState(null);
    const [cvUploading, setCvUploading] = useState(false);
    const [cvPreview, setCvPreview] = useState(false);
    const cvFileRef = useRef(null);

    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projRes, testRes, msgRes] = await Promise.all([
                getProjects(),
                getTestimonials(),
                getMessages()
            ]);
            setProjects(projRes.data);
            setTestimonials(testRes.data);
            setMessages(msgRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCvInfo = async () => {
        try {
            const res = await getCvInfo();
            setCvInfo(res.data);
        } catch (error) {
            console.error('Error fetching CV info:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCvInfo();
    }, []);

    const handleCvUpload = async () => {
        if (!cvFileRef.current?.files[0]) return;
        setCvUploading(true);
        try {
            const formData = new FormData();
            formData.append('cv', cvFileRef.current.files[0]);
            await uploadCv(formData);
            await fetchCvInfo();
            cvFileRef.current.value = '';
        } catch (error) {
            console.error('Error uploading CV:', error);
            const detail = error.response ? `Status ${error.response.status}: ${JSON.stringify(error.response.data)}` : error.message;
            alert(`CV upload failed: ${detail}`);
        } finally {
            setCvUploading(false);
        }
    };

    const handleCvDelete = async () => {
        if (window.confirm('Are you sure you want to delete your CV?')) {
            try {
                await deleteCv();
                setCvInfo({ exists: false });
            } catch (error) {
                console.error('Error deleting CV:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDelete = async (id, type) => {
        const typeName = type === 'projects' ? 'project' : type === 'testimonials' ? 'testimonial' : 'message';
        if (window.confirm(`Are you sure you want to delete this ${typeName}?`)) {
            try {
                if (type === 'projects') {
                    await deleteProject(id);
                } else if (type === 'testimonials') {
                    await deleteTestimonial(id);
                } else if (type === 'messages') {
                    await deleteMessage(id);
                }
                fetchData();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingItem(null);
        fetchData();
    };

    const handleToggleFavourite = async (projectId) => {
        try {
            const res = await toggleFavourite(projectId);
            setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isFavourite: res.data.isFavourite } : p));
        } catch (err) {
            console.error('Failed to toggle favourite', err);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div className="admin-header">
                    <h1 style={{ marginBottom: 0 }}>ADMIN <span>DASHBOARD</span></h1>
                    <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
                </div>

                <div className="tabs">
                    <button
                        className={activeTab === 'analytics' ? 'active' : ''}
                        onClick={() => { setActiveTab('analytics'); setShowForm(false); }}
                    >
                        Analytics
                    </button>
                    <button
                        className={activeTab === 'projects' ? 'active' : ''}
                        onClick={() => { setActiveTab('projects'); setShowForm(false); }}
                    >
                        Projects
                    </button>
                    <button
                        className={activeTab === 'testimonials' ? 'active' : ''}
                        onClick={() => { setActiveTab('testimonials'); setShowForm(false); }}
                    >
                        Testimonials
                    </button>
                    <button
                        className={activeTab === 'messages' ? 'active' : ''}
                        onClick={() => { setActiveTab('messages'); setShowForm(false); }}
                    >
                        Messages
                    </button>
                    <button
                        className={activeTab === 'cv' ? 'active' : ''}
                        onClick={() => { setActiveTab('cv'); setShowForm(false); }}
                    >
                        CV
                    </button>
                </div>

                <div className="controls">
                    {activeTab !== 'messages' && activeTab !== 'cv' && activeTab !== 'analytics' && (
                        <button className="add-btn" onClick={handleAddNew}>
                            {showForm ? 'Cancel' : `+ Add New ${activeTab === 'projects' ? 'Project' : 'Testimonial'}`}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="form-container">
                        {activeTab === 'projects' ? (
                            <ProjectForm projectToEdit={editingItem} onSuccess={handleFormSuccess} />
                        ) : activeTab === 'testimonials' ? (
                            <TestimonialForm testimonialToEdit={editingItem} onSuccess={handleFormSuccess} />
                        ) : null}
                    </div>
                )}

                <div className="list-container">
                    {loading ? <p>Loading...</p> : (
                        <div className="grid-list">
                            {activeTab === 'projects' ? (
                                projects.map(project => (
                                    <div key={project.id} className="item-card">
                                        <div className="thumb-wrapper">
                                            {project.image && <img src={project.image} alt={project.title} className="thumb" />}
                                            <button
                                                className={`fav-btn ${project.isFavourite ? 'active' : ''}`}
                                                onClick={() => handleToggleFavourite(project.id)}
                                                title={project.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                                            >
                                                {project.isFavourite ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                        </div>
                                        <div className="details">
                                            <h3>{project.title}</h3>
                                            <p>{project.category}</p>
                                            <div className="actions">
                                                <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(project.id, 'projects')}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : activeTab === 'testimonials' ? (
                                testimonials.map(testimonial => (
                                    <div key={testimonial.id} className="item-card">
                                        {testimonial.image && <img src={testimonial.image} alt={testimonial.name} className="thumb circle" />}
                                        <div className="details">
                                            <h3>{testimonial.name}</h3>
                                            <p className="role">{testimonial.role}</p>
                                            <p className="rating">{'★'.repeat(testimonial.rating)}</p>
                                            <div className="actions">
                                                <button className="edit-btn" onClick={() => handleEdit(testimonial)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(testimonial.id, 'testimonials')}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : activeTab === 'messages' ? (
                                messages.length === 0 ? <p>No messages yet.</p> :
                                    messages.map(msg => (
                                        <div key={msg.id} className="item-card message-card" style={{ display: 'block' }}>
                                            <div className="details">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                    <h3 style={{ margin: 0 }}>{msg.name}</h3>
                                                    <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p style={{ color: '#0ac0df', marginBottom: '5px' }}>{msg.email}</p>
                                                {msg.mobile && <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '5px' }}>Mobile: {msg.mobile}</p>}
                                                <p style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                                <div className="actions" style={{ marginTop: '10px' }}>
                                                    <button className="delete-btn" onClick={() => handleDelete(msg.id, 'messages')}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : null}
                        </div>
                    )}

                    {activeTab === 'cv' && (
                        <div className="cv-manager">
                            <div className="cv-upload-section">
                                <h3>Upload Your CV (PDF)</h3>
                                <div className="cv-upload-controls">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        ref={cvFileRef}
                                        className="cv-file-input"
                                    />
                                    <button
                                        className="add-btn"
                                        onClick={handleCvUpload}
                                        disabled={cvUploading}
                                    >
                                        {cvUploading ? 'Uploading...' : 'Upload CV'}
                                    </button>
                                </div>
                            </div>

                            {cvInfo && cvInfo.exists && (
                                <div className="cv-current">
                                    <h3>Current CV</h3>
                                    <div className="cv-info-card">
                                        <div className="cv-details">
                                            <span className="cv-filename">📄 {cvInfo.filename}</span>
                                            <span className="cv-date">Uploaded: {new Date(cvInfo.uploadedAt).toLocaleDateString()}</span>
                                            <span className="cv-size">{(cvInfo.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                        <div className="cv-actions">
                                            <button
                                                className="edit-btn"
                                                onClick={() => setCvPreview(!cvPreview)}
                                            >
                                                {cvPreview ? 'Hide Preview' : 'Preview'}
                                            </button>
                                            <button className="delete-btn" onClick={handleCvDelete}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    {cvPreview && (
                                        <div className="cv-preview-frame">
                                            <iframe
                                                src={`http://localhost:5000${cvInfo.url}`}
                                                title="CV Preview"
                                                width="100%"
                                                height="600px"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {cvInfo && !cvInfo.exists && (
                                <p style={{ color: '#888', marginTop: '1.5rem' }}>No CV uploaded yet. Upload a PDF to get started.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <AnalyticsDashboard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
