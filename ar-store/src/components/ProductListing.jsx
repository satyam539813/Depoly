import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei'
import ProductModel, { preloadModels } from './models/ProductModel.jsx'
import products from '../data/products'

preloadModels(products)

function ProductCanvas({ modelPath }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      style={{ background: '#0F172A' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
      <group position={[0, 0, 0]}>
        <PresentationControls
          global={false}
          cursor={true}
          speed={1}
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <ProductModel modelPath={modelPath} />
        </PresentationControls>
      </group>
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr"
        background={false}
        intensity={1}
      />
    </Canvas>
  )
}

export default function ProductListing() {
  return (
      <div className="product-listing">
      <h1 className="main-title">Premium Collection</h1>
        <div className="products-grid">
          {products.map(product => (
              <div key={product.id} className="product-card">
            <div className="model-wrapper">
                <div className="canvas-container">
                <ProductCanvas modelPath={product.modelPath} />
              </div>
                </div>
            <div className="product-category">{product.category}</div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toLocaleString()}</p>
              <div className="button-group">
                <button className="buy-button">Buy Now</button>
                  <Link to={`/ar/${product.id}`} className="ar-button">
                    View in AR
                  </Link>
              </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  )
}