import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../redux/products/types";
import { isSoldOutProduct } from "../utils/isSoldOutProduct";
import { useAppDispatch } from "../redux/store";
import { addToCart } from "../redux/cart/slice";

export const FullProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [chosenColor, setChosenColor] = useState<string>();
  const [chosenSize, setChosenSize] = useState<{
    size: string;
    inStock: boolean;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/products/${id}`
        );

        setProduct(data);
      } catch (error) {
        alert("Ошибка при получении продукта!");
        navigate("/");
      }
    }

    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="fullProduct">
        <div className="container">
          <div className="fullProduct__loading">
            <h2>Загрузка...</h2>
          </div>
        </div>
      </div>
    );
  }

  const isSoldOut = isSoldOutProduct(product.sizes);

  return (
    <section className="fullProduct">
      <div className="container">
        <div className="fullProduct__inner">
          <img
            src={require(`.././assets/img/products/${product.imageUrl}.jpg`)}
            alt="img"
          />
          <div className="fullProduct__content">
            <h2>
              {product.title}&nbsp;
              {product.subtitle && <span>({product.subtitle})</span>}
            </h2>
            <div className="fullProduct__selector">
              <ul>
                {product.colors.map(
                  (color, id) =>
                    color && (
                      <li key={id}>
                        <button
                          onClick={() => {
                            setChosenColor(color);
                          }}
                          className={color === chosenColor ? "active" : ""}
                        >
                          {color}
                        </button>
                      </li>
                    )
                )}
              </ul>
              <ul>
                {product.sizes.map((obj, id) => (
                  <li key={id}>
                    <button
                      onClick={() => {
                        setChosenSize(obj);
                      }}
                      disabled={obj.inStock === false}
                      className={
                        chosenSize !== undefined && chosenSize.size === obj.size
                          ? "active"
                          : ""
                      }
                    >
                      {obj.size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {isSoldOut ? (
              <p>SOLD OUT</p>
            ) : (
              <p className="fullProduct__price">
                {chosenSize && product.sizes
                  ? `$${chosenSize.price}`
                  : `$${product.sizes[0].price} - $${
                      product.sizes[product.sizes.length - 1].price
                    }`}
              </p>
            )}
            <button
              className="fullProduct__addBtn"
              onClick={() => {
                chosenSize &&
                  chosenColor &&
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      subtitle: product.subtitle,
                      imageUrl: product.imageUrl,
                      color: chosenColor,
                      size: chosenSize.size,
                      price: chosenSize.price,
                      value: 1,
                    })
                  );
              }}
              disabled={
                isSoldOut ||
                chosenSize === undefined ||
                chosenColor === undefined
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
