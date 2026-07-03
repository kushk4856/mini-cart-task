// Loading state card skeleton 
export const CardSkeleton = () => {
  return (
    <div className="sk-card">
      <div className="sk-el sk-img"></div>
      <div className="sk-content">
        <div className="sk-el sk-cat"></div>
        <div className="sk-el sk-title"></div>
        <div className="sk-el sk-title short"></div>
        <div className="sk-el sk-rating"></div>
        <div className="sk-el sk-price"></div>
        <div className="sk-el sk-btn"></div>
      </div>
    </div>
  );
}

// grid skeleton
export const GridSkeleton = ({ count = 8 }) => {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// detail skeleton 
export const DetailSkeleton = () => {
  return (
    <div className="sk-detail-wrap">
      <div className="sk-el sk-detail-img"></div>
      <div className="sk-detail-info">
        <div className="sk-el sk-cat"></div>
        <div className="sk-el sk-detail-title"></div>
        <div className="sk-el sk-rating"></div>
        <div className="sk-el sk-detail-price"></div>
        <div className="sk-el sk-desc"></div>
        <div className="sk-el sk-desc"></div>
        <div className="sk-el sk-desc short"></div>
        <div className="sk-el sk-detail-action"></div>
      </div>
    </div>
  );
}
