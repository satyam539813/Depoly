import React from 'react';

export default function About() {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            background: 'linear-gradient(to bottom, #0F172A, #1E293B)',
            padding: '6rem 2rem 4rem 2rem',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Gradient Orbs */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(147, 51, 234, 0) 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0) 70%)',
                borderRadius: '50%',
                filter: 'blur(50px)',
                zIndex: 0
            }} />

            {/* Content Container */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Title */}
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    marginBottom: '2rem',
                    background: 'linear-gradient(45deg, #9333EA, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                }}>
                    About AR Shopsy
                </h1>

                {/* Mission Statement */}
                <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.1)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: '#F8FAFC'
                    }}>Our Mission</h2>
                    <p style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.8',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                        At AR Shopsy, we're revolutionizing the way people shop for furniture by bridging the gap between digital convenience and real-world visualization. Our platform combines cutting-edge augmented reality technology with premium furniture selection, allowing you to experience and visualize products in your space before making a purchase.
                    </p>
                </div>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Feature Cards */}
                    {[
                        {
                            title: "AR Visualization",
                            description: "Experience furniture in your space through augmented reality before purchasing."
                        },
                        {
                            title: "Premium Selection",
                            description: "Curated collection of high-quality furniture from renowned designers and brands."
                        },
                        {
                            title: "Expert Support",
                            description: "Dedicated team of interior design experts to help with your selections."
                        }
                    ].map((feature, index) => (
                        <div key={index} style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            padding: '2rem',
                            border: '1px solid rgba(147, 51, 234, 0.2)',
                            boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.1)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer',
                            ':hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                color: '#F8FAFC'
                            }}>{feature.title}</h3>
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                color: 'rgba(255, 255, 255, 0.8)'
                            }}>{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.1)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: '#F8FAFC'
                    }}>Get in Touch</h2>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '1.5rem',
                        color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                    <button style={{
                        background: 'linear-gradient(45deg, #9333EA, #7C3AED)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        ':hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(147, 51, 234, 0.3)'
                        }
                    }}>
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
} 