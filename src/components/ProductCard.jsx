import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price, image, rating } = product;
  const ratingRound = Math.round(rating?.rate || 0);

  return (
    <div className="card">
      <Link to={`/products/${id}`} className="card-link">
        <div className="img-box">
          <img src={image} alt={title} className="card-img" />
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          
          <div className="card-rating">
            <div className="stars-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`star ${i < ratingRound ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span className="rating-frac">
              {rating?.rate || 0}/<span className="rating-max">5</span>
            </span>
          </div>
          
          <div className="price-row">
            <span className="price">${price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          addToCart(product, 1);
        }}
        className="add-btn"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
