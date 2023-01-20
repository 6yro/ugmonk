import React from "react";
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
  const [product, setProduct] = React.useState<Product>();
  const [chosenColor, setChosenColor] = React.useState<string>();
  const [chosenSize, setChosenSize] = React.useState<{
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
            <div className="fullproduct__selector">
              <ul>
                {product.colors.map(
                  (color, id) =>
                    color && (
                      <li
                        onClick={() => {
                          setChosenColor(color);
                        }}
                        className={color === chosenColor ? "active" : ""}
                        key={id}
                      >
                        {color}
                      </li>
                    )
                )}
              </ul>
              <ul>
                {product.sizes.map((obj, id) => (
                  <li
                    onClick={() => {
                      setChosenSize(obj);
                    }}
                    className={
                      obj.inStock === false
                        ? "disabled"
                        : chosenSize !== undefined &&
                          chosenSize.size === obj.size
                        ? "active"
                        : ""
                    }
                    key={id}
                  >
                    {obj.size}
                  </li>
                ))}
              </ul>
            </div>
            {isSoldOut ? (
              <p>SOLD OUT</p>
            ) : (
              <p className="fullProduct__price">
                {chosenSize && product.sizes
                  ? chosenSize.price
                  : `$${product.sizes[0].price} - $${
                      product.sizes[product.sizes.length - 1].price
                    }`}
              </p>
            )}
            <button
              onClick={() => {
                dispatch(addToCart({}));
              }}
              disabled={isSoldOut}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
