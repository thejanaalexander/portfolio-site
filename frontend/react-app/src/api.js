import axios from 'axios';
// Axios instance for API requests

// In production (InfinityFree), API is at /api on the same domain
// In development, use the local PHP server URL
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add Token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (formData) => api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, formData) => api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Testimonials API
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (formData) => api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateTestimonial = (id, formData) => api.put(`/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// Messages API
export const createContactMessage = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/messages');
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// CV API
export const getCvInfo = () => api.get('/cv');
export const uploadCv = (formData) => api.post('/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCv = () => api.delete('/cv');

// Analytics API
export const getAnalytics = () => api.get('/analytics');

// Favourite API
export const toggleFavourite = (id) => api.patch(`/projects/${id}/favourite`);
export const getFavouriteProjects = () => api.get('/projects/favourites');

export default api;
