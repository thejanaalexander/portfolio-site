import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './ContactSection.scss';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const { createContactMessage } = await import('../api');
            await createContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', mobile: '', message: '' });
            alert("Thanks for reaching out! I'll get back to you soon.");
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus('error');
            alert("Failed to send message. Please try again.");
        } finally {
            setStatus('');
        }
    };

    return (
        <section className="contact-section" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                <h2>Let's <span className="highlight">Talk</span></h2>
                <p className="subtitle">Have a project in mind? Let's build something amazing together.</p>
            </motion.div>

            <div className="contact-container">
                {/* Contact Form */}
                <motion.form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Your Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Tell me about your project..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">
                        Send Message <FaPaperPlane style={{ marginLeft: '10px' }} />
                    </button>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="info-item">
                        <div className="icon"><FaEnvelope /></div>
                        <div className="details">
                            <h4>Email Me</h4>
                            <p>hello@alexcreator.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon"><FaPhone /></div>
                        <div className="details">
                            <h4>Call Me</h4>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon"><FaMapMarkerAlt /></div>
                        <div className="details">
                            <h4>Location</h4>
                            <p>San Francisco, CA (Remote Friendly)</p>
                        </div>
                    </div>


                </motion.div>
            </div>


        </section>
    );
};

export default ContactSection;
