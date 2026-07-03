import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      // email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Shipping address is required';
    }

    // validate card digits
    const cleanCard = formData.cardNumber.replace(/\s+/g, '');
    if (!cleanCard) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cleanCard)) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits';
    }

    // MM/YY format check
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = 'Must be in MM/YY format';
    }

    // CVV 3 digits check
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
     
      setErrors(validationErrors);
      return;
    }

 
    setIsProcessing(true);

    // Simulate server transaction delay
    setTimeout(() => {
      const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      // console.log(generatedId);
      setOrderId(generatedId);
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="checkout-success-container">
        <FiCheckCircle size={64} className="success-icon-svg" />
        <h2>Order Confirmed!</h2>
        <p className="order-number-text">
          Thank you for your purchase. Your order number is <strong>{orderId}</strong>.
        </p>
        <p className="confirmation-subtext">
          We have sent a confirmation email to <strong>{formData.email}</strong>.
        </p>
        <Link to="/" className="back-home-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-checkout-container">
        <h2>Empty Cart Checkout</h2>
        <p>You cannot checkout with an empty cart. Please add items to your cart first.</p>
        <Link to="/" className="back-catalog-btn">
          Go to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="detail-nav">
        <Link to="/" className="bc-link">Catalog</Link>
        <span className="bc-divider">&gt;</span>
        <Link to="/cart" className="bc-link">Cart</Link>
        <span className="bc-divider">&gt;</span>
        <span className="bc-current">Checkout</span>
      </div>

      <h1 className="checkout-page-title">Secure Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form-section">
          <div className="form-group-section">
            <h3 className="section-subtitle">Shipping Information</h3>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.address ? 'error' : ''}
                  rows="3"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>
          </div>

          <div className="form-group-section payment-section">
            <h3 className="section-subtitle">Payment details</h3>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 1234 5678"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.cardNumber ? 'error' : ''}
                  maxLength="19"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
            </div>

            <div className="form-row card-meta-row">
              <div className="form-field">
                <label htmlFor="expiry">Expiration (MM/YY)</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.expiry ? 'error' : ''}
                  maxLength="5"
                />
                {errors.expiry && <span className="error-message">{errors.expiry}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={errors.cvv ? 'error' : ''}
                  maxLength="3"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="submit-order-btn"
          >
            {isProcessing ? 'Processing Transaction...' : `Pay $${subtotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary-section">
          <div className="summary-card">
            <h3 className="summary-title">Your Order</h3>
            <div className="checkout-items-list">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-small">
                  <div className="item-thumb-container">
                    <img src={item.image} alt={item.title} className="item-thumb" />
                    <span className="item-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="item-name-box">
                    <span className="item-name">{item.title}</span>
                  </div>
                  <span className="item-price-sum">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Total Price</span>
              <span className="final-price">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
