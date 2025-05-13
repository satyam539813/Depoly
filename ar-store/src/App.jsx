import { Routes, Route } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import ARView from './components/ar/ARView';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/ar/:id" element={<ARView />} />
        </Routes>
    );
}