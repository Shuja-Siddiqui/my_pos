import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cart from "./Cart";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export const GenerateInvoiceComponent = () => {
  const [discount, setDiscount] = useState();
  const [dailySales, setDailySales] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [returnSales, setReturnSales] = useState([]);
  const navigate = useNavigate();
  const [medications, setMedications] = useState();
  const getProduct = () => {
    fetch("http://localhost:5001/api/v1/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json();
        } else {
          throw new Error("Failed to get product");
        }
      })
      .then((data) => {
        setMedications(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const getDailySaleReports = () => {
    // API call to get daily sales report
    fetch("http://localhost:5001/api/v1/sale/today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json();
        } else {
          throw new Error("Failed to get product");
        }
      })
      .then((data) => {
        setDailySales(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  const getDailyRetrunSaleReports = () => {
    // API call to get daily sales report
    fetch("http://localhost:5001/api/v1/returns/today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json();
        } else {
          throw new Error("Failed to get product");
        }
      })
      .then((data) => {
        setReturnSales(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  useEffect(() => {
    getDailySaleReports();
    getDailyRetrunSaleReports();
  }, []);
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const checkout = (updatedItems, isFinal = true) => {
    if (isFinal) {
      if (cartItems.length === 0) return;

      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const sale = {
        date: new Date().toISOString(),
        items: [...cartItems],
        total,
      };

      setSales((prevSales) => [...prevSales, sale]);
      setCartItems([]);
    } else {
      // Update cart items without completing the sale
      setCartItems(updatedItems);
    }
  };
  console.log(returnSales);
  // const retrunAmount = returnSales === null ? 0 : returnSales?.totalReturns;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className=" flex w-full">
        <div
          className="h-10 w-12 bg-black p-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          <FaArrowLeft className=" text-white  w-full h-full " />
        </div>
        <h1 className="text-3xl ml-[30%] font-bold text-center">
          POS Inventory System
        </h1>
      </div>

      <div className="max-w-7xl  mx-auto">
        <div className="flex justify-end items-center mb-6 w-full">
          <button
            className="p-2  bg-black text-white font-semibold rounded-lg"
            onClick={() => navigate(`/retrun-inventory`)}
          >
            Return Item Page
          </button>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className=" flex flex-col gap-4 ">
            <div className="z-30">
              <ProductList
                addToCart={addToCart}
                medications={medications}
                discount={discount}
                setDiscount={setDiscount}
              />
            </div>
            <Cart
              items={cartItems}
              removeFromCart={removeFromCart}
              checkout={checkout}
              getProduct={getProduct}
              getDailySaleReports={getDailySaleReports}
              discount={discount}
              setDiscount={setDiscount}
            />
            {/* <div className="fixed justify-between  flex gap-4  bottom-0 rounded-lg  p-4 right-0 w-full h-56">
              <div className="w-[30%]  p-6 shadow bg-white">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  Today's Sale
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-center text-gray-600 font-medium">
                    Total Sales:
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    <span className="text-5xl">{dailySales?.totalSales}</span>{" "}
                    Rs
                  </p>
                </div>
              </div>
              <div className="w-[30%]  p-6 shadow bg-white">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  Today's Return Sale
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-center text-gray-600 font-medium">
                    Total Sales:
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    <span className="text-5xl">{retrunAmount}</span> Rs
                  </p>
                </div>
              </div>
              <div className="w-[30%]  p-6 shadow bg-white">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  Today's Total Amount
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-center text-gray-600 font-medium">
                    Total Sales:
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    <span className="text-5xl">
                      {dailySales?.totalSales - retrunAmount}
                    </span>{" "}
                    Rs
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
