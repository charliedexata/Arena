import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../Context/AuthContext";
import PrimaryButton from '../components/Buttons/PrimaryButton';

import { AppDataContext } from "../Context/AppDataContext";
import { convertToSlug } from "../utils";

export default function Product() {
  let { slug } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { products, categories } = useContext(AppDataContext);

  const selectedProduct = products?.filter(
    (e) => convertToSlug(e.Product_Name) === slug
  )?.[0];

  const handleAddToCart = () => {
    let existingItem = JSON.parse(localStorage.getItem('cart'));
    if(existingItem) {
      existingItem.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(existingItem));
    } else {
      var cartItems = [];
      cartItems.push(selectedProduct);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    navigate('/cart');
  }

  useEffect(() => {
    var dataLayer = {
      "page_name" : "pdp-" + selectedProduct?.Product_Name,
      "page_type" : "ProductDetails",
      "page_section": selectedProduct?.Product_Name,
      "login_status": auth.loggedIn_status,
      "currency": "usd",
      "channel": "web",
      "product_id": selectedProduct?.Product_Id.split(','),
      "product_name": selectedProduct?.Product_Name.split(','),
      "product_category": categories.filter((category) => category.Category_Id === selectedProduct?.Category_Id)[0].Category_Name,
      "product_price": String(selectedProduct?.Product_Price).split(','),
      "at_property": "c43182c9-f2e4-b078-c499-14cc9f882923"
    }
    auth.user_id && (dataLayer["customer_id"] = auth.user_id);
    if(window.utag) {
      window.utag.view(dataLayer);
    }
  }, []);

  return (
    <div className="bg-white">
      {/* <div className="bg-[#0351aa] py-5">
        <h2 className="text-2xl text-center font-bold tracking-tight text-white">
          {selectedProduct.Product_Name}
        </h2>
      </div> */}
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img
              src={selectedProduct.Product_Detail_Image}
              alt={""}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-xl font-bold tracking-tight text-secondary sm:text-4xl leading-normal">{selectedProduct.Product_Name}</h1>
            <p className="text-2xl font-medium text-gray-900">
              Price: ${selectedProduct.Product_Price}
            </p>
            <div className="flex gap-1">
              {/* {[1, 2, 3, 4, 5].map((e, i) => (
                <StarIcon className="text-[#0351aa] w-5 h-5" />
              ))} */}
            </div>
            <div className="">
              <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size:</label>
              <select className="bg-gray-50 border border-gray text-black text-sm rounded-lg block w-16 p-2.5">
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
              </select>
            </div>
            <p className="text-black">{selectedProduct.Product_Description}</p>
            <PrimaryButton onClick={handleAddToCart}>Add to Cart</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
