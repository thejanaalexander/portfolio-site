import React, { useState, useEffect } from 'react';
import { createProject, updateProject } from '../api';
import './ProjectForm.scss';

const ProjectForm = ({ projectToEdit, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        technologies: '',
        liveLink: '',
        githubLink: ''
    });
    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                category: projectToEdit.category,
                description: projectToEdit.description,
                technologies: Array.isArray(projectToEdit.technologies) ? projectToEdit.technologies.join(', ') : projectToEdit.technologies,
                liveLink: projectToEdit.liveLink,
                githubLink: projectToEdit.githubLink
            });
        }
    }, [projectToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else if (e.target.name === 'gallery') {
            setGallery(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
        data.append('liveLink', formData.liveLink);
        data.append('githubLink', formData.githubLink);

        if (image) data.append('image', image);
        gallery.forEach(file => data.append('gallery', file));

        try {
            if (projectToEdit) {
                await updateProject(projectToEdit.id, data);
            } else {
                await createProject(data);
            }
            onSuccess();
        } catch (error) {
            alert('Failed to save project');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <h3>{projectToEdit ? 'Edit Project' : 'Add New Project'}</h3>

            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
            </div>

            <div className="form-group">
                <label>Technologies (comma separated)</label>
                <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, ..." />
            </div>

            <div className="form-group">
                <label>Main Media (Image or Video)</label>
                <input type="file" name="image" onChange={handleFileChange} accept="image/*,video/*" />
            </div>

            <div className="form-group">
                <label>Gallery Media (Images or Videos)</label>
                <input type="file" name="gallery" onChange={handleFileChange} accept="image/*,video/*" multiple />
            </div>

            <div className="form-group">
                <label>Live Link</label>
                <input type="url" name="liveLink" value={formData.liveLink} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>GitHub Link</label>
                <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn" disabled={uploading}>
                {uploading ? 'Saving...' : (projectToEdit ? 'Update Project' : 'Add Project')}
            </button>
        </form>
    );
};

export default ProjectForm;
