import React, { useEffect, useRef } from 'react';

const BackgroundEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particleCount = 35; // Enough dots for ambient feel
        const colors = ['#6929f2', '#c038d3', '#0ac0df']; // Theme colors

        let width = window.innerWidth;
        let height = window.innerHeight; // Will be set to parent height

        // Resize handler
        const handleResize = () => {
            // We want the canvas to cover the parent container
            const parent = canvas.parentElement;
            if (parent) {
                width = parent.clientWidth;
                height = parent.clientHeight;
                canvas.width = width;
                canvas.height = height;
            }
        };

        // Particle class — floating glowing circles
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = 0.15 + Math.random() * 0.35; // Slow drift upward
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.radius = 1.5 + Math.random() * 3; // Small circles
                this.amplitude = 30 + Math.random() * 50; // Gentle horizontal sway
                this.period = 200 + Math.random() * 300;
                this.offset = Math.random() * 1000;
                this.opacity = 0.05 + Math.random() * 0.2;
                this.baseX = this.x; // Store original X for sine oscillation
            }

            update() {
                this.y -= this.speed;
                // Gentle horizontal sway using sine
                this.x = this.baseX + Math.sin((this.y + this.offset) / this.period) * this.amplitude;
                // Reset when off top
                if (this.y < -20) {
                    this.reset();
                    this.y = height + 20;
                }
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
        }

        const particles = Array.from({ length: particleCount }, () => new Particle());

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Optional: Draw a very faint background rect for "trail" effect if we wanted persistent trails, 
            // but we are clearing for crisp lines here.

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize
        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.8
            }}
        />
    );
};

export default BackgroundEffect;
