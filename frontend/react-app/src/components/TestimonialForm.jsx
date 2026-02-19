import React, { useState, useEffect } from 'react';
import { createTestimonial, updateTestimonial } from '../api';
import './ProjectForm.scss'; // Reuse existing form styles

const TestimonialForm = ({ testimonialToEdit, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        rating: 5
    });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (testimonialToEdit) {
            setFormData({
                name: testimonialToEdit.name,
                role: testimonialToEdit.role,
                text: testimonialToEdit.text,
                rating: testimonialToEdit.rating
            });
        }
    }, [testimonialToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('text', formData.text);
        data.append('rating', formData.rating);
        if (image) data.append('image', image);

        try {
            if (testimonialToEdit) {
                await updateTestimonial(testimonialToEdit.id, data);
            } else {
                await createTestimonial(data);
            }
            onSuccess();
        } catch (error) {
            alert('Failed to save testimonial');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <h3>{testimonialToEdit ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>

            <div className="form-group">
                <label>Client Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Role / Company</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Review Text</label>
                <textarea name="text" value={formData.text} onChange={handleChange} rows="4" required />
            </div>

            <div className="form-group">
                <label>Rating (1-5)</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required
                />
            </div>

            <div className="form-group">
                <label>Client Photo (Optional)</label>
                <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
            </div>

            <button type="submit" className="submit-btn" disabled={uploading}>
                {uploading ? 'Saving...' : (testimonialToEdit ? 'Update Testimonial' : 'Add Testimonial')}
            </button>
        </form>
    );
};

export default TestimonialForm;
