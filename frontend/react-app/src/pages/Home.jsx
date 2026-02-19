import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhyChooseMeSection from '../components/WhyChooseMeSection';
import RecentWorksSection from '../components/RecentWorksSection';
import ExpertiseSection from '../components/ExpertiseSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SkillsSection from '../components/SkillsSection';
import WorkflowSection from '../components/WorkflowSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';


const Home = () => {
    return (
        <div className="home-page">
            <SEO
                title="Home | Creative Developer Portfolio"
                description="Welcome to my creative developer portfolio. Explore my work in web development, design, and digital experiences."
            />
            <HeroSection />
            <AboutSection />
            <WhyChooseMeSection />
            <RecentWorksSection />
            <ExpertiseSection />
            <TestimonialsSection />
            <SkillsSection />
            <WorkflowSection />
            <ServicesSection />
            <ContactSection />
        </div>
    );
};

export default Home;
