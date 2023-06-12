import React, { useEffect, useContext } from "react";
import Hero from "../components/hero";
import Categories from "../components/category";
import Promotion from "../components/promotion";
import Products from "../components/products";
import { AuthContext } from "../Context/AuthContext";

export default function Home() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    var dataLayer = {
      "pageName" : "home",
      "pageType" : "Home",
      "pageSection": "Home",
      "loginStatus": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    auth.user_id && (dataLayer["customerId"] = auth.user_id);
    console.log(dataLayer, '>>>>>')
  }, []);
  return (
    <div>
      <Hero />
      <Categories />
      <Promotion />
      <Products />
    </div>
  );
}
