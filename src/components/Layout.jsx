import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Layout = () => {

  const [searchVal, setSearchVal] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemCount } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchVal(query);
    // console.log(query);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
    // console.log(value);
    
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo">
           Mini Cart
          </Link>
          
          <div className="search-bar-container">
            <div className="search-bar-wrapper">
              <FiSearch className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchVal}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/" className="nav-link">Catalog</Link>
            <Link to="/cart" className="cart-badge-link" aria-label="Cart">
              <FiShoppingCart size={22} />
              {totalItemCount > 0 && (
                <span className="cart-badge">{totalItemCount}</span>
              )}
            </Link>
            <div className="profile-icon-link">
              <FiUser size={22} style={{ cursor: 'pointer' }} />
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Mini Cart | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
