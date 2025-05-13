import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR, Interactive, useXR } from '@react-three/xr';
import { 
    OrbitControls, 
    useGLTF, 
    Environment, 
    PresentationControls, 
    Html, 
    useProgress,
    AccumulativeShadows,
    RandomizedLight,
    Plane,
    useAnimations
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import products from '../../data/products';

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="model-loader">
                <div className="loader-progress">{progress.toFixed(0)}%</div>
                <div className="loader-bar" style={{ width: `${progress}%` }} />
            </div>
        </Html>
    );
}

function ARModel({ modelPath, scale = 1, isPreview = false }) {
    const { scene, animations } = useGLTF(modelPath);
    const modelRef = useRef();
    const [modelScale, setModelScale] = useState(scale);
    const [position, setPosition] = useState([0, 0, -1]);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const { isPresenting } = useXR();
    const { animations: modelAnimations } = useAnimations(animations, modelRef);
    
    // Ground plane detection
    const [groundPlane, setGroundPlane] = useState(null);
    
    const handleScale = (delta) => {
        const scaleSpeed = 0.1;
        const newScale = modelScale + (delta * scaleSpeed);
        setModelScale(Math.min(Math.max(newScale, 0.5), 2.0));
    };

    const handlePlacement = (e) => {
        if (isPresenting && e.intersection) {
            setPosition([
                e.intersection.point.x,
                e.intersection.point.y,
                e.intersection.point.z
            ]);
            setGroundPlane(e.intersection.object);
        }
    };

    const handleTouch = useMemo(() => {
        let lastDistance = 0;
        let lastPosition = null;
        
        return (event) => {
            if (event.touches.length === 2) {
                // Pinch to scale
                const distance = Math.hypot(
                    event.touches[0].clientX - event.touches[1].clientX,
                    event.touches[0].clientY - event.touches[1].clientY
                );
                
                if (lastDistance) {
                    const delta = (distance - lastDistance) * 0.01;
                    handleScale(delta);
                }
                
                lastDistance = distance;
                event.preventDefault();
            } else if (event.touches.length === 1 && isPresenting) {
                // Single touch to move on ground plane
                const touch = event.touches[0];
                if (lastPosition) {
                    const deltaX = (touch.clientX - lastPosition.x) * 0.01;
                    const deltaZ = (touch.clientY - lastPosition.y) * 0.01;
                    setPosition(prev => [
                        prev[0] + deltaX,
                        prev[1],
                        prev[2] + deltaZ
                    ]);
                }
                lastPosition = { x: touch.clientX, y: touch.clientY };
                event.preventDefault();
            }
        };
    }, [modelScale, isPresenting]);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.scale.set(modelScale, modelScale, modelScale);
            
            // Cast shadows
            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [modelScale]);

    useEffect(() => {
        // Play any available animations
        if (modelAnimations && Object.keys(modelAnimations).length > 0) {
            Object.values(modelAnimations)[0].play();
        }
    }, [modelAnimations]);

    useEffect(() => {
        if (isMobile) {
            document.addEventListener('touchmove', handleTouch, { passive: false });
            return () => document.removeEventListener('touchmove', handleTouch);
        }
    }, [handleTouch, isMobile]);

    const memoizedScene = useMemo(() => {
        const clonedScene = scene.clone();
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return clonedScene;
    }, [scene]);

    return isPreview ? (
        <>
            <primitive 
                ref={modelRef}
                object={memoizedScene}
                scale={[modelScale, modelScale, modelScale]}
                position={[0, 0, 0]}
                onWheel={(e) => handleScale(e.deltaY > 0 ? -1 : 1)}
                castShadow
                receiveShadow
            />
            <AccumulativeShadows
                temporal
                frames={30}
                alphaTest={0.85}
                scale={10}
                position={[0, -0.1, 0]}
            >
                <RandomizedLight
                    amount={8}
                    radius={5}
                    intensity={0.5}
                    ambient={0.5}
                    position={[5, 5, -10]}
                />
            </AccumulativeShadows>
        </>
    ) : (
        <>
            <Interactive onSelect={handlePlacement}>
                <Plane
                    args={[20, 20]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2, 0]}
                    receiveShadow
                >
                    <meshStandardMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </Plane>
            </Interactive>
            <primitive 
                ref={modelRef}
                object={memoizedScene}
                scale={[modelScale, modelScale, modelScale]}
                position={position}
                castShadow
                receiveShadow
            />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
        </>
    );
}

function PreviewMode({ product }) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: isMobile ? 60 : 45 }}
            style={{ 
                background: 'linear-gradient(135deg, #030712, #111827)',
                width: '100%',
                height: '100vh'
            }}
            gl={{ 
                preserveDrawingBuffer: true,
                powerPreference: "high-performance",
                antialias: true,
                shadowMap: true,
                shadows: true
            }}
            shadows
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        >
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <spotLight
                    position={[0, 5, 5]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <group position={[0, 0, 0]}>
                    <PresentationControls
                        global={false}
                        cursor={true}
                        speed={1}
                        zoom={isMobile ? 1.5 : 2}
                        rotation={[0, -Math.PI / 4, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 1, tension: 170, friction: 26 }}
                    >
                        <ARModel modelPath={product.modelPath} scale={1} isPreview={true} />
                    </PresentationControls>
                </group>
                <Environment
                    files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr"
                    background={false}
                    intensity={1}
                />
                {!isMobile && (
                    <OrbitControls
                        enableZoom={true}
                        minDistance={2}
                        maxDistance={10}
                        zoomSpeed={1}
                        enableDamping
                        dampingFactor={0.05}
                    />
                )}
            </Suspense>
        </Canvas>
    );
}

function Notification({ message, isVisible }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="notification"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.3 
                    }}
                >
                    <div className="notification-dot" />
                    <div>
                        <div>{message}</div>
                        <div className="scaling-instructions">
                            Use mouse wheel or pinch to scale the model
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function ARView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isARSupported, setIsARSupported] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(true);
    
    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        const checkARSupport = async () => {
            try {
                if ('xr' in navigator) {
                    const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
                    setIsARSupported(isSupported);
                } else {
                    setError('WebXR is not available in your browser');
                }
            } catch (err) {
                setError('Failed to check AR support');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        checkARSupport();

        // Hide notification after 3 seconds instead of 5
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!product) {
        return (
            <div className="ar-error-container">
                <h2>Product not found</h2>
                <button onClick={() => navigate('/products')} className="back-button">
                    Back to Products
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="ar-loading-container">
                <div className="loading-spinner"></div>
                <p>Checking AR capabilities...</p>
            </div>
        );
    }

    return (
        <div className="ar-view-container">
            {!isARSupported && (
                <>
                    <motion.div 
                        className="ar-header minimal"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button onClick={() => navigate('/products')} className="back-button">
                            Back to Products
                        </button>
                    </motion.div>
                    <Notification 
                        message="AR not supported - Showing 3D preview"
                        isVisible={showNotification}
                    />
                    <PreviewMode product={product} />
                </>
            )}
            
            {isARSupported && (
                <>
                    <div className="ar-header minimal">
                        <button onClick={() => navigate('/products')} className="back-button">
                            Back to Products
                        </button>
                    </div>
                    <Canvas>
                        <XR>
                            <ambientLight intensity={0.8} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <ARModel modelPath={product.modelPath} scale={0.8} />
                        </XR>
                    </Canvas>
                    <ARButton
                        className="ar-button"
                        sessionInit={{
                            requiredFeatures: ['hit-test'],
                            optionalFeatures: ['dom-overlay'],
                        }}
                    />
                </>
            )}
        </div>
    );
} 