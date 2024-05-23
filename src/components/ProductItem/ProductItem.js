import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from '../ShareButton/ShareButton';
import './ProductItem.css';

const ProductItem = ({ item, index }) => {
  const handleRedirect = () => {
    window.location.href = `https://furrl.in/productDetail?id=${item.id}&ref=vibeResults_HomeHunts`;
  };
  return (
      <li
        onClick={handleRedirect}
        key={item.id} 
        className={`product-item ${index % 5 === 2 ? "product-item-single" : ""}`}>
      <img
        loading="lazy"
        className={`product-image ${index % 5 === 2 ? "product-image-single" : ""}`}
      src={item.images[0].src}
      alt={item.title}/>
      <div className="product-buttons">
          <ShareButton productUrl={`https://furrl.in/productDetail?id=${item.id}&ref=vibeResults_HomeHunts`} />
      </div>
      <div className="product-details">
        <p className="vendor-name">{item.brand[0].name}</p>
        <p className="vendor-name product-title">{item.title}</p>
        <p className="vendor-name product-title product-price">
          Rs. {item.price.value}{" "}
          <span className="product-mrp">Rs. {item.MRP.value}</span>
          <span className="product-discount">{item.discountPercent}%</span>
        </p>
      </div>
    </li>


  );
};

export default ProductItem;
