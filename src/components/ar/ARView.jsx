import React, { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ARButton, XR, Controllers, useHitTest } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const products = [
    { id: '1', modelPath: '/models/1.glb' },
    { id: '2', modelPath: '/models/scene.glb' },
    { id: '3', modelPath: '/models/3.glb' }
];

function ARModel({ modelPath }) {
    const model = useGLTF(modelPath);
    const [modelPosition, setModelPosition] = useState(null);

    useHitTest((hitMatrix) => {
        if (!modelPosition) {
            const position = [hitMatrix.elements[12], hitMatrix.elements[13], hitMatrix.elements[14]];
            setModelPosition(position);
        }
    });

    if (!modelPosition) {
        return null;
    }

    return <primitive object={model.scene} position={modelPosition} scale={0.1} />;
}

function ARView() {
    const { id } = useParams();
    const product = products.find(p => p.id === id);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: '100vh', width: '100%', position: 'relative' }}
        >
            <ARButton
                sessionInit={{
                    requiredFeatures: ["hit-test"],
                }}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '12px 24px',
                    backgroundColor: '#9333ea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    zIndex: 1000
                }}
            />
            <Canvas>
                <XR>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Controllers />
                    {product ? (
                        <Suspense fallback={null}>
                            <ARModel modelPath={product.modelPath} />
                        </Suspense>
                    ) : (
                        <mesh>
                            <boxGeometry args={[0.1, 0.1, 0.1]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                    )}
                    {/* <OrbitControls /> */}
                </XR>
            </Canvas>
            {!product && (
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'red', background: 'white', padding: '10px' }}>
                    Product not found. Please check the ID.
                </div>
            )}
        </motion.div>
    );
}

export default ARView; 