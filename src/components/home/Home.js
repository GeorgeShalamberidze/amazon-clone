import React from "react";
import "./home.css";
import Product from "./Product";
import { productArray } from "./productArray";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id={"2312512512"}
            title="the lean startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
          <Product
            id={"5312512512"}
            title="the lean startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          {productArray.map((prod) => {
            return (
              <Product
                id={prod.id}
                title={prod.title}
                price={prod.price}
                image={prod.image}
                rating={prod.rating}
              />
            );
          })}
        </div>

        <div className="home__row">
          <Product
            id={"7312512512"}
            title="the lean startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
