import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { DetailSkeleton } from '../components/Skeleton';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  // console.log(id);

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="detail-page-container">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || (!loading && !product)) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product could not be found.'}</p>
        <Link to="/" className="back-catalog-btn">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const { title, price, description, category, image, rating } = product;
  const ratingRound = Math.round(rating?.rate || 0);

  return (
    <div className="detail-page-container">
      <div className="detail-nav">
        <Link to="/" className="bc-link">Catalog</Link>
        <span className="bc-divider">&gt;</span>
        <span className="bc-current">{title}</span>
      </div>

      <div className="product-detail-layout">
        <div className="detail-image-section">
          <img src={image} alt={title} className="product-detail-image" />
        </div>

        <div className="detail-info-section">
          <span className="detail-category">{category}</span>
          <h1 className="detail-title">{title}</h1>

          <div className="detail-rating">
            <div className="stars-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`star-icon-small ${i < ratingRound ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span className="rating-val">{rating?.rate}</span>
            <span className="rating-count">({rating?.count} reviews)</span>
          </div>

          <div className="detail-price-box">
            <span className="detail-price">${price.toFixed(2)}</span>
          </div>

          <p className="detail-description">{description}</p>

          <div className="purchase-controls">
            <div className="quantity-stepper">
              <button 
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="stepper-btn minus"
              >
                &minus;
              </button>
              <span className="stepper-value">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="stepper-btn plus"
              >
                &#43;
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="detail-add-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
