import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const products = [
    {
        id: 1,
        name: 'Premium Chair',
        price: '$299',
        category: 'Furniture',
        modelPath: '/models/chair.glb'
    },
    {
        id: 2,
        name: 'Modern Table',
        price: '$499',
        category: 'Furniture',
        modelPath: '/models/table.glb'
    },
    {
        id: 3,
        name: 'Designer Lamp',
        price: '$199',
        category: 'Lighting',
        modelPath: '/models/lamp.glb'
    }
];

function ProductCard({ product }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="product-card"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <div style={{ height: '300px', position: 'relative' }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enableZoom={false} />
                    {/* Add your 3D model here */}
                </Canvas>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem'
                }}>{product.name}</h3>
                <p style={{ 
                    color: '#9333ea',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>{product.price}</p>
                <span style={{
                    display: 'inline-block',
                    background: 'rgba(147, 51, 234, 0.2)',
                    color: '#9333ea',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem'
                }}>{product.category}</span>
            </div>
        </motion.div>
    );
}

function ProductListing() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                minHeight: '100vh',
                width: '100%',
                background: 'var(--background-color)',
                padding: '4rem 2rem',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '2rem',
                    color: 'white',
                    background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>Our Products</h1>

                <div style={{ marginBottom: '2rem' }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                background: selectedCategory === category ? '#9333ea' : 'rgba(147, 51, 234, 0.2)',
                                color: selectedCategory === category ? 'white' : '#9333ea',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                marginRight: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default ProductListing; 