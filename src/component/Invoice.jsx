import React from "react";
// import { format } from 'date-fns';

function Invoice({
  items,
  total,
  finalTotal,
  discount,
  customerInfo,
  onClose,
  invoiceNumber,
}) {
  const printInvoice = () => {
    window.print();
  };
  const today = new Date().toISOString();
  console.log(today);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
              onClick={onClose}
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
              <p>{customerInfo.name}</p>
              <p>{customerInfo.phone}</p>
            </div>
            <div className="text-right">
              <p>
                <strong>Invoice #:</strong> {invoiceNumber}
              </p>
              <p>
                <strong>Date:</strong> {new Date(today).toLocaleDateString()}
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
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-600">{item.dosage}</div>
                  </td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">{item.price.toFixed(2)}</td>
                  <td className="text-right py-2">
                    {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between border-b py-2">
                <span>Subtotal:</span>
                <span>{total.toFixed(2)} Rs</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Discount:</span>
                <span>{discount} %</span>
              </div>
              <div className="flex justify-between font-bold text-lg py-2">
                <span>Total:</span>
                <span>{finalTotal} Rs</span>{" "}
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
  );
}

export default Invoice;
