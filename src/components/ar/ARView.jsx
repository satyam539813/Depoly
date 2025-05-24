import React, { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ARButton, XR, Controllers, Interactive } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const products = [
    { id: '1', modelPath: '/models/1.glb' },
    { id: '2', modelPath: '/models/scene.glb' },
    { id: '3', modelPath: '/models/3.glb' }
];

function PlacedModel({ modelPath, position, rotation }) {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene.clone()} position={position} rotation={rotation || [0,0,0]} scale={0.1} />;
}

function ARView() {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const [placedModels, setPlacedModels] = useState([]);

    const handleSelect = (event) => {
        if (product && event.intersection) {
            const { matrix } = event.intersection; 
            const position = new THREE.Vector3();
            const quaternion = new THREE.Quaternion();
            const scale = new THREE.Vector3(); 
            
            matrix.decompose(position, quaternion, scale);

            setPlacedModels(prevModels => [
                ...prevModels,
                {
                    id: Date.now(), 
                    modelPath: product.modelPath,
                    position: [position.x, position.y, position.z],
                    rotation: [quaternion.x, quaternion.y, quaternion.z, quaternion.w] 
                }
            ]);
        }
    };

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
                <XR sessionInit={{ requiredFeatures: ["hit-test"] }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Controllers />
                    <Interactive onSelect={handleSelect}>
                         <mesh visible={false}><planeGeometry args={[100, 100]} /><meshStandardMaterial transparent opacity={0} /></mesh>
                    </Interactive>
                    {placedModels.map(modelData => (
                        <Suspense fallback={null} key={modelData.id}>
                            <PlacedModel modelPath={modelData.modelPath} position={modelData.position} rotation={modelData.rotation} />
                        </Suspense>
                    ))}
                    {!product && !placedModels.length && ( // Show fallback if no product AND no models placed
                        <mesh>
                            <boxGeometry args={[0.1, 0.1, 0.1]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                    )}
                    {/* <OrbitControls /> */}
                </XR>
            </Canvas>
            {!product && ( // Keep this message for invalid product IDs
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'red', background: 'white', padding: '10px' }}>
                    Product not found. Please check the ID.
                </div>
            )}
        </motion.div>
    );
}

export default ARView; 