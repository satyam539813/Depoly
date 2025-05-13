import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ProductModel, { preloadModels } from './models/ProductModel.jsx'
import products from '../data/products'

preloadModels(products)

export default function ProductListing() {
  return (
      <div className="product-listing">
        <h1 className="main-title">AR Product Showcase</h1>
        <div className="products-grid">
          {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="canvas-container">
                  <Canvas
                      camera={{ position: [2, 2, 2], fov: 50 }}
                      frameloop="demand"
                  >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1.2} />
                    <spotLight
                        position={[5, 5, 5]}
                        angle={0.3}
                        intensity={2}
                        penumbra={1}
                        castShadow
                    />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                        enablePan={false}
                    />
                    <ProductModel modelPath={product.modelPath} />
                  </Canvas>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/ar/${product.id}`} className="ar-button">
                    View in AR
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}