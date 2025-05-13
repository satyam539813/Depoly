import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Tween, Easing, update as tweenUpdate } from '@tweenjs/tween.js';
import '../styles/Home.css';

function HomeModel({ position, rotation, scale }) {
    const { scene } = useGLTF('/1.glb');
    const modelRef = useRef();

    // Animate model on mount with floating effect
    useEffect(() => {
        if (!modelRef.current) return;

        const start = { y: -2 };
        const end = { y: position[1] };

        const tween = new Tween(start)
            .to(end, 2000)
            .easing(Easing.Quadratic.Out)
            .onUpdate((val) => {
                if (modelRef.current) {
                    modelRef.current.position.y = val.y;
                }
            })
            .start();

        // Floating animation with reduced movement for less jittering
        const floatTween = new Tween({ y: position[1] })
            .to({ y: position[1] + 0.1 }, 3000) // Reduced movement and increased duration
            .easing(Easing.Sinusoidal.InOut) // Smoother easing
            .yoyo(true)
            .repeat(Infinity)
            .onUpdate((val) => {
                if (modelRef.current) {
                    modelRef.current.position.y = val.y;
                }
            })
            .start();

        return () => {
            tween.stop();
            floatTween.stop();
        };
    }, [position]);

    useFrame(() => {
        tweenUpdate();
        if (modelRef.current) {
            modelRef.current.position.x = position[0];
            modelRef.current.position.z = position[2];
            modelRef.current.rotation.set(...rotation);
            modelRef.current.scale.set(...scale);
        }
    });

    return <primitive ref={modelRef} object={scene} />;
}

export default function Home() {
    const [lightPosition, setLightPosition] = useState([0, 0, 5]);
    const lightRef = useRef();

    // Handle cursor movement for light position
    const handleMouseMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setLightPosition([x * 5, y * 5, 5]);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            {/* Font import */}
            <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                style={{
                    background: '#000000',
                    width: '100%',
                    height: '100%'
                }}
                dpr={[1, 2]} // Optimize performance
                frameloop="demand" // Render only when needed
            >
                <ambientLight intensity={0.2} />
                <pointLight
                    ref={lightRef}
                    position={lightPosition}
                    intensity={5}
                    color="#ffffff"
                    distance={20}
                    decay={2}
                />
                <HomeModel
                    position={[0, 0, 0]}
                    rotation={[0, Math.PI / 4, 0]}
                    scale={[0.8, 0.8, 0.8]}
                />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                    autoRotate
                    autoRotateSpeed={1}
                    dampingFactor={0.05} // Add damping for smoother rotation
                />
            </Canvas>

            {/* Title Text with mix-blend-mode */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 1,
                    mixBlendMode: 'difference',
                    pointerEvents: 'none',
                    width: '100%',
                }}
            >
                <h1
                    style={{
                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                        fontWeight: '700',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: "'Gothic A1', sans-serif",
                        whiteSpace: 'nowrap',
                        padding: '0 1rem',
                    }}
                >
                    AR SHOPSY
                </h1>
            </div>
        </div>
    );
} 