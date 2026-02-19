import React from 'react';
import AboutPageContent from '../components/AboutPageContent';
import ExperienceTimeline from '../components/ExperienceTimeline';

import SEO from '../components/SEO';

const AboutPage = () => {
    return (
        <div className="about-page">
            <SEO
                title="About Me | Creative Developer"
                description="Learn more about my journey, skills, and experience as a creative developer and designer."
            />
            <AboutPageContent />
            <ExperienceTimeline />
        </div>
    );
};

export default AboutPage;
