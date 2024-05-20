import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GiftIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../Context/AuthContext";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")));
  const { auth } = useContext(AuthContext);

  const totalPrice = cartItems?.map((item) => item.Product_Price).reduce(function (a, b) {return a + b;}, 0);

  const removeCartItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.Product_Id !== id);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setCartItems(newCartItems)
  }

  useEffect(() => {
    var dataLayer = {
      "page_name" : "cart",
      "page_type" : "Cart",
      "page_section": "Checkout",
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "at_property": "c43182c9-f2e4-b078-c499-14cc9f882923"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if(cartItems?.length > 0) {
      dataLayer["product_id"] = cartItems?.map(item => item.Product_Id);
      dataLayer["product_name"] = cartItems?.map(item => item.Product_Name);
      dataLayer["product_price"] = cartItems?.map(item => item.Product_Price);
      dataLayer["total_items"] = cartItems?.length;
      dataLayer["total_quantity"] = cartItems?.length;
    } 
    if(window.utag) {
      window.utag.view(dataLayer);
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-[#0351aa] py-5">
        <div className="mx-auto text-center max-w-2xl px-4 flex justify-between items-center sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl text-center font-medium tracking-tight text-white">
            Your Shopping Cart
          </h2>
          { cartItems?.length > 0 && <button className="inline-block rounded-full text-[#0351aa] px-10 py-2 bg-white shadow-sm" onClick={() => navigate('/checkout')}>
            Checkout
          </button> }
        </div>
      </div>
      <div className="mx-auto text-center max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        { cartItems?.length > 0 ? <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <div className="border gap-4 p-5">
            { cartItems.map((cartItem) => {
              return <div className="flex gap-4 p-5 border mt-4">
                <div className="aspect-w-1 aspect-h-1 w-72 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-60">
                  <img
                    src={cartItem.Product_Thumbnail_Image}
                    alt={""}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="w-full">
                  <div>
                    <p className="text-lg font-medium text-gray-900 text-left">
                      {cartItem.Product_Name}
                    </p>
                    <p className="text-xl font-medium text-gray-900 text-left">
                      ${cartItem.Product_Price}
                    </p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm text-gray-900 font-bold text-left">
                      Size: 12
                    </h4>
                  </div>
                  <div className="mt-2 text-left">
                    <button className="inline-block mt-6 rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm" onClick={() => removeCartItem(cartItem.Product_Id)}>Remove</button>
                  </div>
                </div>
              </div>;
            }) }
          </div>
          <div className="border p-5">
            <h3 className="text-xl text-gray-900 font-bold text-left">
              Order Now
            </h3>
            <div className="flex gap-2 mt-5">
              <GiftIcon className="text-[#0351aa] w-6 h-6" />
              <p className="text-md text-gray-900 text-left">
                Do you have a gift voucher or promotional code?
              </p>
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className=" font-semibold">Code</label>
              <input className="border border-gray-400 mt-2 w-full p-2" />
              <button className="text-[#0351aa] border-2 px-3 py-2 mt-4 border-[#0351aa]">
                Confirm Code
              </button>
            </div>
            <div className="mt-12">
              <div className="flex items-end justify-between">
                <span>Sub Total</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <span>Delivery</span>
                <span className=" text-green-800">Free</span>
              </div>
              <hr className="my-5" />
              <div className="flex items-end justify-between mt-3">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <button className="inline-block mt-6 rounded-full bg-[#0351aa] px-10 py-2 text-white shadow-sm w-full" onClick={() => navigate('/checkout')}>
                Checkout
              </button>
            </div>
          </div>
        </div> : <div className="mt-6 p-6"><h1 className="text-3xl text-gray-900 font-bold text-center">Oops! Your cart is empty</h1></div> }
        
      </div>
    </div>
  );
}
