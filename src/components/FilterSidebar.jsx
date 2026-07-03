import { FiSliders, FiChevronRight, FiX } from 'react-icons/fi';

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  showFilters,
  setShowFilters,
  categories
}) => {
  return (
    <aside className={`sidebar ${showFilters ? 'mobile-active' : ''}`}>
      <div className="sb-header">
        <h2 className="sb-title">Filters</h2>
        <FiSliders className="desktop-icon" size={20} />
        <button 
          type="button"
          className="close-btn" 
          onClick={() => setShowFilters(false)}
          aria-label="Close filters"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="divider"></div>

      <div className="filter-sec">
        <div className="cats-list">
          <div 
            className={`cat-item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              setShowFilters(false);
            }}
          >
            <span>All Products</span>
            <FiChevronRight className="arrow" />
          </div>
          {categories &&
            categories.map((cat) => (
              <div
                key={cat}
                className={`cat-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowFilters(false);
                }}
              >
                <span>{cat}</span>
                <FiChevronRight className="arrow" />
              </div>
            ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="filter-sec">
        <h3 className="group-title">Price Range</h3>
        <div className="slider-box">
          <input
            type="range"
            min="0"
            max="300"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range-input"
          />
          <div className="range-labels">
            <span>$0</span>
            <span className="range-val">Max: ${maxPrice}</span>
            <span>$300</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
