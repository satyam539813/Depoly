import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function ARView() {
    const { id } = useParams();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                height: '100vh',
                width: '100%',
                background: 'var(--background-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                color: 'white',
            }}
        >
            <h1 style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                AR View - Product {id}
            </h1>
            
            <div style={{
                width: '100%',
                maxWidth: '800px',
                height: '600px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
            }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    AR experience loading...
                </p>
            </div>
        </motion.div>
    );
}

export default ARView; 