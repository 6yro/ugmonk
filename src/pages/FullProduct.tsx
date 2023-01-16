import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const FullProduct: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = React.useState<any>();
  const { id } = useParams();

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
          <div className="fullProduct__inner">
            <h2>Загрузка...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fullProduct">
      <div className="container">
        <div className="fullProduct__inner">
          <h2>
            {product.title}&nbsp;
            {product.subtitle && <span>({product.subtitle})</span>}
          </h2>
          <img
            src={require(`.././assets/img/products/${product.imageUrl}.jpg`)}
            alt="img"
          />
          {product.isSoldOut ? (
            <p>SOLD OUT</p>
          ) : !product.discountPrice ? (
            <p> ${product.price}.00</p>
          ) : (
            <p className="fullProduct__discount-price">
              ${product.price}.00
              {product.discountPrice && (
                <span> &nbsp;${product.discountPrice}.00</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
