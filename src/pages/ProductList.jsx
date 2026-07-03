import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSliders } from 'react-icons/fi';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import { GridSkeleton } from '../components/Skeleton';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allProducts, loading: productsLoading, error: productsError } = useFetch('https://fakestoreapi.com/products');
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch('https://fakestoreapi.com/products/categories');

  // filter and sorting states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(300);
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 6;
  const searchQuery = searchParams.get('search') || '';
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // reset current page when filter apply
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, sortBy, maxPrice]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!allProducts) return [];

    let result = [...allProducts];

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (debouncedSearchQuery.trim() !== '') {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    result = result.filter((product) => product.price <= maxPrice);

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [allProducts, selectedCategory, debouncedSearchQuery, sortBy, maxPrice]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  // current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  const startProductIndex = filteredAndSortedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endProductIndex = Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="catalog">
        <div className="header-sk"></div>
        <GridSkeleton count={itemsPerPage} />
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="error-container">
        <h2>Failed to load catalog</h2>
        <p>{productsError || categoriesError}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="catalog">
      <div className="breadcrumbs">
        <span className="bc-link" onClick={() => setSelectedCategory('all')}>Home</span>
        <span className="bc-divider">&gt;</span>
        <span className="bc-current">
          {selectedCategory === 'all' ? 'All Products' : selectedCategory}
        </span>
      </div>

      <div className="split-layout">
        {showFilters && (
          <div 
            className="filter-backdrop" 
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categories={categories}
        />

        <main className="products-main">
          <div className="products-header">
            <div className="summary-box">
              <h1 className="category-title">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory}
              </h1>
              <p className="results-count">
                Showing {startProductIndex}-{endProductIndex} of {filteredAndSortedProducts.length} Products
              </p>
            </div>

            <div className="controls-row">
              <button 
                type="button"
                className="filter-toggle"
                onClick={() => setShowFilters(true)}
              >
                <FiSliders size={16} />
                <span>Filters</span>
              </button>

              <div className="sort-controls">
                <span className="sort-label">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>We couldn't find anything matching your filters or search.</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductList;
