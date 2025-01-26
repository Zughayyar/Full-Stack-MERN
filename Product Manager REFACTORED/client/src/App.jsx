import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import ProductForm from "./components/ProductForm";
import NotFound from "./components/NotFound";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;