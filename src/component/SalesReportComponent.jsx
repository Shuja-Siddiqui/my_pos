import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegEye } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SalesReportComponent = () => {
  const [allSales, setAllSales] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const navigate = useNavigate();

  const getDailySaleReports = () => {
    fetch("http://localhost:5001/api/v1/sale/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to get sales data");
        }
      })
      .then((data) => {
        setAllSales(data?.data || []);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    getDailySaleReports();
  }, []);

  const filterData = (data) => {
    let filteredData = data;
    if (searchterm) {
      filteredData = filteredData.filter((item) =>
        item?.customerName?.toLowerCase().includes(searchterm.toLowerCase())
      );
    }
    return filteredData;
  };

  const filteredSales = filterData(allSales);

  // Group sales by customer but create new rows if time is different
  const groupedSales = filteredSales.reduce((acc, sale) => {
    const saleDate = new Date(sale.soldAt).toLocaleDateString();
    const saleTime = new Date(sale.soldAt).toLocaleTimeString();
    // Find existing entry with the same customer and time
    const existingSale = acc.find(
      (entry) =>
        entry.customerName === sale.customerName && entry.time === saleTime
    );

    if (existingSale) {
      existingSale.totalAmount += sale.totalPrice || 0;
      existingSale.items.push(sale); // Store details for modal
    } else {
      acc.push({
        customerName: sale.customerName,
        date: saleDate,
        time: saleTime,
        totalAmount: sale.totalPrice || 0,
        items: [sale],
      });
    }

    return acc;
  }, []);

  const printInvoice = () => {
    window.print();
  };
  console.log(selectedSale);
  return (
    <>
      <div className="p-5 space-y-8 bg-[#F3F4F6] min-h-screen relative">
        {/* Header */}
        <div className="flex w-full">
          <div
            className="h-10 w-12 bg-black p-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft className="text-white w-full h-full" />
          </div>
          <h1 className="text-3xl ml-[40%] font-bold text-center">
            Sales Report
          </h1>
        </div>

        {/* Search Input */}
        <div className="flex justify-center">
          <input
            type="text"
            value={searchterm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Sales Table */}
        <div className="bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Customer Name</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Total Amount</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedSales.length > 0 ? (
                  groupedSales.map((sale, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-slate-300 cursor-pointer"
                    >
                      <td className="px-4 py-2 border">
                        {sale.customerName || "N/A"}
                      </td>
                      <td className="px-4 py-2 border">{sale.date}</td>
                      <td className="px-4 py-2 border">{sale.time}</td>
                      <td className="px-4 py-2 border font-medium">
                        {sale.totalAmount.toFixed(2)} Rs
                      </td>
                      <td className="px-4 flex justify-center items-center gap-5 py-3  font-medium text-center z-50">
                        <FaRegEye
                          className="text-[#333333] text-xl"
                          onClick={() => setSelectedSale(sale)}
                        />
                        {/* <IoPrint className="text-blue-600 text-xl " /> */}
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

        {/* Sale Details Modal */}
      </div>
      {selectedSale && (
        <div className="fixed inset-0 top-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 print:shadow-none print:p-0">
            <div className="print:hidden flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Invoice</h2>
              <div className="space-x-2">
                <button
                  onClick={printInvoice}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Print
                </button>
                <button
                  onClick={() => setSelectedSale(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="print:text-black">
              {/* <div class="bg-white print text-gray-800 flex justify-center flex-col ">
           <div class="text-center">
             <h1 class="bg-blue-800 p-2 text-white  font-bold">Siddiqui Medical Store</h1>
           </div>
           <div class="w-4/5 flex  justify-between mt-5">
             <div class="flex flex-col items-start">
               <h1 class="text-md font-bold">53- Gulberg III Near Sui Gas Office Guru Mangat Road Opposite SNGPL Office Lahore </h1>
               <h1 class="text-sm font-bold">Phone# </h1>
               <h1 class="text-sm font-bold">03364214916,03114572734</h1>
               <div class="flex">
                 <h1 class="text-sm font-bold flex gap-1">License :<span>490-B/GT/10/2016</span></h1>
               </div>
             </div>
           </div> */}
              <div className="text-center ">
                <h1 className="text-2xl font-bold">POS Software</h1>
                {/* <p>53- Gulberg III Near Sui Gas Office Guru Mangat Road Opposite SNGPL Office Lahore</p>
             <p>Phone:03364214916,03114572734</p> */}
              </div>
              <div className="text-center text-sm tracking-wider  font-bold">
                <p>
                  53- Gulberg III Near Sui Gas Office Guru <br />
                  Mangat Road Opposite SNGPL Office Lahore
                </p>
                <p>Ph# 03321639988</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="font-bold mb-2">Bill To:</h3>
                  <p>{selectedSale.customerName}</p>
                  {/* <p>{customerInfo.phone}</p> */}
                </div>
                <div className="text-right">
                  <p>{/* <strong>Invoice #:</strong> {invoiceNumber} */}</p>
                  <p>
                    <strong>Date:</strong> {selectedSale.date}
                  </p>
                </div>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2  border-gray-300">
                    <th className="text-left py-2">Item</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSale?.items?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">
                        <div>{item.product.name}</div>
                        <div className="text-sm text-gray-600">
                          {/* {item.dosage} */}
                        </div>
                      </td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        {item.product.price.toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        {item.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-8">
                <div className="w-64">
                  {/* <div className="flex justify-between border-b py-2">
                    <span>Subtotal:</span>
                    <span>{total.toFixed(2)} Rs</span>
                  </div> */}
                  <div className="flex justify-between font-bold text-lg py-2">
                    <span>Total:</span>
                    <span>{selectedSale?.totalAmount} Rs</span>{" "}
                  </div>
                </div>
              </div>

              <div className="text-center text-sm tracking-wider  font-bold">
                <p>Thank you for your business!</p>
                <p>
                  (Computer Software Developed By ConsoleDot <br />{" "}
                  <span className="text-sm text-gray-600">
                    (all right reserved)
                  </span>
                  Ph# 03321639988)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
