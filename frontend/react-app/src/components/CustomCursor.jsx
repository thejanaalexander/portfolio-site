import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.scss';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    // Add hover effect listeners to clickable elements
    useEffect(() => {
        const handleMouseOver = () => setIsHovered(true);
        const handleMouseOut = () => setIsHovered(false);

        const clickables = document.querySelectorAll('a, button, .cursor-hover');
        clickables.forEach(el => {
            el.addEventListener('mouseover', handleMouseOver);
            el.addEventListener('mouseout', handleMouseOut);
        });

        return () => {
            clickables.forEach(el => {
                el.removeEventListener('mouseover', handleMouseOver);
                el.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []); // Note: In a real app with dynamic content, this might need a MutationObserver

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            opacity: 1,
            scale: 1,
        },
        hover: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            opacity: 1,
            scale: 2.5,
            backgroundColor: "rgba(105, 41, 242, 0.2)",
            borderColor: "#6929f2",
            borderWidth: "1px"
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={isHovered ? "hover" : "default"}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        />
    );
};

export default CustomCursor;
