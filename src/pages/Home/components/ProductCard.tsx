import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../redux/products/types";

export const ProductCard: React.FC<Product> = ({
  id,
  title,
  subtitle,
  price,
  imageUrl,
  discountPrice,
  isSoldOut,
}) => {
  return (
    <Link to={`product/${id}`} className="product">
      <img
        src={require(`../../.././assets/img/products/${imageUrl}.jpg`)}
        alt="img"
      />
      <div className="product__text">
        <h4>
          {title}&nbsp;
          {subtitle && <span>({subtitle})</span>}
        </h4>
        {isSoldOut ? (
          <p className="product__price">SOLD OUT</p>
        ) : !discountPrice ? (
          <p className="product__price"> ${price}.00</p>
        ) : (
          <p className="product__price product__price--discount">
            ${price}.00
            {discountPrice && <span> &nbsp;${discountPrice}.00</span>}
          </p>
        )}
      </div>
    </Link>
  );
};
