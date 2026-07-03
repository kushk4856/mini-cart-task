import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, totalItemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="detail-nav">
        <Link to="/" className="bc-link">Catalog</Link>
        <span className="bc-divider">&gt;</span>
        <span className="bc-current">Cart</span>
      </div>

      <h1 className="cart-title">Shopping Cart ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</h1>

      <div className="cart-layout">
        <div className="cart-items-section">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-image-box">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </div>

              <div className="cart-item-details">
                <Link to={`/products/${item.id}`} className="cart-item-title-link">
                  <h3 className="cart-item-title">{item.title}</h3>
                </Link>
                <span className="cart-item-category">{item.category}</span>
              </div>

              <div className="cart-item-pricing">
                <span className="unit-price-label">Price</span>
                <span className="unit-price">${item.price.toFixed(2)}</span>
              </div>

              <div className="cart-item-quantity">
                <span className="quantity-label">Quantity</span>
                <div className="cart-qty-stepper">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="cart-stepper-btn minus"
                  >
                    &minus;
                  </button>
                  <span className="cart-stepper-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="cart-stepper-btn plus"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <span className="line-total-label">Total</span>
                <span className="line-total">${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-item-btn"
                aria-label="Remove item"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span className="total-amount">${subtotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/" className="back-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
