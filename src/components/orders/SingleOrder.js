import React from "react";
import "./singleOrder.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";

const SingleOrder = ({ order }) => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => {
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
            </div>
          </div>
        );
      })}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total : {value} </h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default SingleOrder;
