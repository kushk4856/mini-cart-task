import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <div className="error-container">
                <h2>Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" className="retry-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Go to Catalog
                </Link>
              </div>
            }
          />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
