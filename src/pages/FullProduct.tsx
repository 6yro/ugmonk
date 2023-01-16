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
    return <>Загрузка...</>;
  }

  return (
    <div className="product">
      <img
        src={require(`.././assets/img/products/${product.imageUrl}.jpg`)}
        alt="img"
      />
      <div className="product__text">
        <h4>
          {product.title}&nbsp;
          {product.subtitle && <span>({product.subtitle})</span>}
        </h4>
        {product.isSoldOut ? (
          <p className="product__price">SOLD OUT</p>
        ) : !product.discountPrice ? (
          <p className="product__price"> ${product.price}.00</p>
        ) : (
          <p className="product__price product__price--discount">
            ${product.price}.00
            {product.discountPrice && (
              <span> &nbsp;${product.discountPrice}.00</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
