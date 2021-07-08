import React from "react";
import { useStateValue } from "../../StateProvider";
import "./checkout.css";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />

        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
        </div>
        {basket?.map((item) => {
          const removeFromBasket = () => {
            dispatch({
              type: "REMOVE_FROM_BASKET",
              id: item.id,
            });
          };
          return (
            <div key={item.id} className="checkoutProduct">
              <img src={item.image} className="checkoutProduct__image" />

              <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{item.title}</p>
                <p className="product__price">
                  <small>$</small>
                  <strong>{item.price}</strong>
                </p>
                <div className="product__rating">
                  {Array(item.rating)
                    .fill()
                    .map(() => {
                      return <p>⭐</p>;
                    })}
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
