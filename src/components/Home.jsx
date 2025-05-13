import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

function Model() {
    const { scene } = useGLTF('/models/1.glb');
    return <primitive object={scene} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} />;
}

function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
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
                fontSize: '3.5rem',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Welcome to AR Shopsy
            </h1>
            
            <div style={{ 
                width: '100%',
                maxWidth: '800px',
                height: '400px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls 
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={2}
                    />
                    <Model />
                </Canvas>
            </div>

            <p style={{
                maxWidth: '600px',
                textAlign: 'center',
                marginTop: '2rem',
                fontSize: '1.2rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
            }}>
                Experience our products in stunning 3D and AR. Browse through our collection
                and visualize them in your space before making a purchase.
            </p>
        </motion.div>
    );
}

export default Home; 