import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, keywords }) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}

SEO.defaultProps = {
    title: 'Portfolio | Creative Developer',
    description: 'Welcome to my portfolio. I create immersive digital experiences with a focus on modern web technologies and creative design.',
    name: 'Portfolio Owner',
    type: 'website',
    keywords: 'portfolio, developer, web design, creative, react, cyberpunk'
};

export default SEO;
