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
      "page_name" : "Arena Ecommerce",
      "page_type" : "Home",
      "page_section": "Home",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    // window.utag.view(dataLayer);
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
