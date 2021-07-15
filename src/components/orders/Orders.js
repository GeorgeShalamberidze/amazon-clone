import React, { useState, useEffect } from "react";
import "./orders.css";
import SingleOrder from "./SingleOrder";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Order</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <SingleOrder order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
