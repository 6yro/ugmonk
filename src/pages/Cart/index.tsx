import React from "react";
import { useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { CartProductCard } from "./components/CartProductCard";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartProducts, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__inner">
          <h2>Cart</h2>
          <div className="cart__products">
            {cartProducts.map((obj, id) => (
              <CartProductCard key={id} {...obj} />
            ))}
          </div>
          <p>{`Total price: $${totalPrice}`}</p>
          <button onClick={() => console.log(cartProducts)}>Buy</button>
          <button onClick={() => dispatch(clearCart())}>Clear cart</button>
        </div>
      </div>
    </section>
  );
};
