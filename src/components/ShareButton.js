// src/components/ShareButton.js
import React from 'react';
import './ShareButton.css';
import SvgIcon from './shareIcon';
import WishlistIcon from './wishlistIcon';

const ShareButton = ({ productUrl }) => {
  const shareProduct = () => {
    navigator.share({
      title: 'Check out this product!',
      url: productUrl
    });
  };

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
    <button onClick={shareProduct} className="share-button">
      <SvgIcon/>
    </button>
    <button  className="share-button">
    <WishlistIcon/>
  </button></div>
   
  );
};

export default ShareButton;
