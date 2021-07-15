import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from "../../axios";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);

  const history = useHistory();

  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      // Stripe expects the total in cents. thats why we multiply it by 100
      const response = await axios.post(
        `/payments/create?total=${getBasketTotal(basket) * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log(clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

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
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value} </h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
