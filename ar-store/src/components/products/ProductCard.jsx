 // src/components/products/ProductCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCanvas from '../common/ProductCanvas';
import ProductModel from '../models/ProductModel';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <motion.article
      className="product-card glass-effect"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-card__media">
        <ProductCanvas>
          <ProductModel modelPath={product.modelPath} color={product.color} />
        </ProductCanvas>
      </div>
      <div className="product-card__content">
        <div className="product-card__info">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <p className="product-card__material">Material: {product.material}</p>
        </div>
        <Link to={`/ar/${product.id}`} className="product-card__cta">
          View in AR
        </Link>
      </div>
    </motion.article>
  );
}
