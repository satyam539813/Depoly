import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="about-container"
            style={{
                minHeight: '100vh',
                width: '100%',
                background: 'var(--background-color)',
                padding: '4rem 2rem',
                color: 'white',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    About AR Shopsy
                </h1>

                <div style={{
                    display: 'grid',
                    gap: '2rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#9333ea' }}>Our Mission</h2>
                        <p style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
                            We strive to revolutionize online shopping by bringing immersive 3D and AR experiences
                            to our customers, making product visualization easier and more engaging than ever before.
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#9333ea' }}>Innovation</h2>
                        <p style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
                            Using cutting-edge WebGL and AR technology, we provide an interactive shopping
                            experience that helps customers make informed decisions about their purchases.
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#9333ea' }}>Quality</h2>
                        <p style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
                            We ensure the highest quality 3D models and AR experiences, working with top
                            designers and developers to create realistic product visualizations.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default About; 