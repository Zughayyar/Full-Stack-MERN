import Product from "./components/Product.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import ProductUpdate from "./components/ProductUpdate.jsx";
import NotFound from "./components/NotFound.jsx";
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Product />
                        <ProductList />
                    </div>
                } />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/:id/edit" element={<ProductUpdate />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
            </Routes>
        </div>
    );
};

export default App;