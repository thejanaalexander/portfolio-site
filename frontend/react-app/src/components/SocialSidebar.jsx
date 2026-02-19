import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import './SocialSidebar.scss';

const socials = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook', color: '#1877F2' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram', color: '#E4405F' },
    { icon: <FaTiktok />, url: 'https://tiktok.com', label: 'TikTok', color: '#00F2EA' },
    { icon: <FaYoutube />, url: 'https://youtube.com', label: 'YouTube', color: '#FF0000' },
];

const SocialSidebar = () => {
    return (
        <motion.div
            className="social-sidebar"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="social-line top" />
            {socials.map((social, index) => (
                <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    data-color={social.color}
                    style={{ '--hover-color': social.color }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.7 + index * 0.1 }}
                    whileHover={{ scale: 1.2, x: 4 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {social.icon}
                </motion.a>
            ))}
            <div className="social-line bottom" />
        </motion.div>
    );
};

export default SocialSidebar;
