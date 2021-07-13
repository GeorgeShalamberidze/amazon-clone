import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./payment.css";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} Items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Tbilisi</p>
            <p>Georgia</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items & Delivery</h3>
          </div>
          <div className="payment__items">
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
                    <button onClick={removeFromBasket}>
                      Remove from basket
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details"></div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
