import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr';
import { OrbitControls, useGLTF } from '@react-three/drei';
import products from '../../data/products';

function ARScene() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    // Load your GLB model from public directory
    const { scene } = useGLTF('/scene.glb'); // Direct path from public folder

    return (
        <primitive
            object={scene}
            position={[0, 0, -2]}  // Default position
            scale={[1, 1, 1]}      // Start with original scale
        />
    );
}

export default function ARView() {
    const [isARSupported, setIsARSupported] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkARSupport = async () => {
            if (navigator.xr) {
                try {
                    const supported = await navigator.xr.isSessionSupported('immersive-ar');
                    setIsARSupported(supported);
                } catch (error) {
                    console.error('AR support check failed:', error);
                }
            }
            setIsLoading(false);
        };

        checkARSupport();
    }, []);

    return (
        <div className="ar-container" style={{ width: '100vw', height: '100vh' }}>
            {isLoading && <div className="loading">Checking AR capabilities...</div>}

            {!isLoading && (
                <>
                    {isARSupported ? (
                        <>
                            <ARButton
                                sessionInit={{
                                    requiredFeatures: ['hit-test'],
                                    optionalFeatures: ['dom-overlay']
                                }}
                            />
                            <Canvas camera={{ position: [0, 0, 3] }}>
                                <XR>
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <OrbitControls />
                                    <ARScene />
                                </XR>
                            </Canvas>
                        </>
                    ) : (
                        <>
                            <Canvas camera={{ position: [0, 0, 3] }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <OrbitControls />
                                <ARScene />
                            </Canvas>
                            <div className="ar-warning">
                                AR not supported - Showing 3D preview
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}