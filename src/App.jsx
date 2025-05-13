import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/ProductListing';
import About from './components/About';
import ARView from './components/ar/ARView';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHome, FaBox, FaInfoCircle } from 'react-icons/fa';
import './styles/Navigation.css';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            position: 'relative', 
            overflow: 'auto',
            background: 'var(--background-color)'
        }}>
            {/* Font imports */}
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            
            {/* Navigation Bar */}
            <nav className="top-nav">
                <div className="nav-links">
                    <button
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        onClick={() => navigate('/')}
                    >
                        <i><FaHome /></i>
                        <span>HOME</span>
                    </button>
                    <button
                        className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                        onClick={() => navigate('/products')}
                    >
                        <i><FaBox /></i>
                        <span>PRODUCTS</span>
                    </button>
                    <button
                        className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                        onClick={() => navigate('/about')}
                    >
                        <i><FaInfoCircle /></i>
                        <span>ABOUT</span>
                    </button>
                </div>
            </nav>

            {/* Animated Routes */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ 
                        height: '100%',
                        minHeight: '100vh',
                        width: '100%',
                        overflow: 'auto'
                    }}
                >
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/ar/:id" element={<ARView />} />
                    </Routes>
                </motion.div>
            </AnimatePresence>

            {/* Glass Morphism Footer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderTop: '1px solid rgba(147, 51, 234, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.05em',
                    zIndex: 10,
                }}
            >
                © {new Date().getFullYear()} AR SHOPSY - All rights reserved
            </div>
        </div>
    );
}

export default App; 