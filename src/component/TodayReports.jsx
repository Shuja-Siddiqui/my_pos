import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
export const TodaySalesReportComponent = ({ filteredSales, setActiveTab }) => {
  const [returnProduct, setReturnProduct] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const getReturnProduct = () => {
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
        setReturnProduct(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  useEffect(() => {
    getReturnProduct();
  }, []);

  //   const filteredSales = filterData(allSales);
  const totalSales = filteredSales
    .reduce((sum, sale) => sum + (sale.totalPrice || 0), 0)
    .toFixed(2);

  //   const totalReturns = returnProduct
  //     .reduce((sum, sale) => sum + (sale.totalReturnPrice || 0), 0)
  //     .toFixed(2);

  const netAmount = (totalSales - returnProduct?.totalReturns).toFixed(2);
  return (
    <div className="p-5 space-y-8 bg-[#F3F4F6] min-h-screen">
      {/* Header */}
      <div className=" flex w-full">
        <div
          className="h-10 w-12 bg-black p-2 rounded-lg cursor-pointer"
          onClick={() => setActiveTab("all")}
        >
          {" "}
          <FaArrowLeft className=" text-white  w-full h-full " />
        </div>
        <h1 className="text-3xl ml-[35%] font-bold text-center">
          Today Sales Report
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          value={searchterm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product name..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <div className="text-blue-600 font-medium">Total Sales Amount</div>
          <div className="text-2xl font-bold">{totalSales} Rs</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-blue-600 font-medium">Total Return Amount</div>
          <div className="text-2xl font-bold">
            {returnProduct?.totalReturns?.toFixed(2)}{" "}
            Rs
          </div>
        </div>
        {/* <div className="bg-green-50 p-4 rounded-lg shadow">
          <div className="text-green-600 font-medium">Total Items Sold</div>
          <div className="text-2xl font-bold">
            {allSales.reduce((sum, sale) => sum + (sale.product._id?.length || 0), 0)}
          </div>
        </div> */}
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <div className="text-purple-600 font-medium">Total Transactions</div>
          <div className="text-2xl font-bold">{filteredSales?.length}</div>
        </div>
        <div className="bg-[#dce2e0] p-4 rounded-lg shadow">
          <div className="text-font-medium">Total Amount</div>
          <div className="text-2xl font-bold">{netAmount} Rs</div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white  shadow">
        {/* <h2 className="text-xl font-bold mb-4">Recent Sales</h2> */}
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">QTY</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-slate-300 cursor-pointer"
                  >
                    <td className="px-4 py-2 border">
                      {sale.customerName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {sale?.product?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      <ul className="list-disc list-inside">
                        {sale.quantity || "N/A"}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border">
                      {/* Format the date if available */}
                      {sale.soldAt
                        ? new Date(sale.soldAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border font-medium">
                      {sale.totalPrice?.toFixed(2) || "0.00"} Rs
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No sales data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
