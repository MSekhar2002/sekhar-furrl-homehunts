// src/components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import './ProductItem.css';

const ProductItem = ({ productD }) => {
  const mainImage = productD.images.length > 0 ? productD.images[0].src : 'default-image-url.jpg';

  return (
    <div className="product-item">
      <div className="product-image-container">
      <a href={`https://furrl.in/productDetail?id=${productD.id}&ref=vibeResults_HomeHunts`}>

          <img src={mainImage} alt={productD.title} className="product-image" />
        </a>
        <div className="product-buttons">
          <ShareButton productUrl={`https://furrl.in/productDetail?id=${productD.id}&ref=vibeResults_HomeHunts`} />
        </div>
      </div>
      <Link to={`/product/${productD.id}`} className="product-info">
        <p className='vendor-name'>{productD.brand[0].name}</p>
        <p className='product-title'>{productD.title}</p>
        <p className="product-price">
          Rs. {productD.price.value} <span className="product-discount">Rs. {productD.MRP.value}</span> {productD.discountPercent}%
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
