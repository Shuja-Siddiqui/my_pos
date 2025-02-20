import React from "react";
import { useNavigate } from "react-router-dom";

export const DashboardComponent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen bg-[#F3F4F6] p-5">
        <h1 className="text-3xl font-bold">Pharmacy POS Dashboard</h1>

        <div className="w-full gap-4 grid grid-cols-3 mt-10">
          <div className="w-full bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
            <div className="flex flex-col">
              <h1 className=" text-2xl  font-bold">Generate Invoice</h1>
              <h2 className="text-[#858B92] text-sm">
                Create a new a invoice for a customer purchase
              </h2>
            </div>
            <div>
              <button
                className="hover:bg-black  bg-white  border-[#E8E8E8] border hover:text-white  p-3 font-semibold rounded-lg"
                onClick={() => navigate(`/generateInvoice`)}
              >
                New Invoice
              </button>
            </div>
          </div>

          <div className="w-full  bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
            <div className="flex flex-col">
              <h1 className=" text-2xl  font-bold">Inventory</h1>
              <h2 className="text-[#858B92] text-sm">
                Manage your medicine inventory
              </h2>
            </div>
            <div>
              <button
                className=" border hover:bg-black  hover:text-white  border-[#E8E8E8] p-3  font-semibold rounded-lg"
                onClick={() => navigate(`/inventory`)}
              >
                View Inventory
              </button>
            </div>
          </div>
          <div className="w-full bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
            <div className="flex flex-col">
              <h1 className=" text-2xl  font-bold">Retrun Item</h1>
              <h2 className="text-[#858B92] text-sm">
                View and Retrun Inventory
              </h2>
            </div>
            <div>
              <button
                className=" border hover:bg-black  hover:text-white  border-[#E8E8E8]  p-3 font-semibold rounded-lg"
                onClick={() => navigate(`/retrun-inventory`)}
              >
                Retrun Inventory
              </button>
            </div>
          </div>
          
          {localStorage.getItem("@role") === "admin" && (
            <>
              <div className="w-full bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
                <div className="flex flex-col">
                  <h1 className=" text-2xl  font-bold">Sales Report</h1>
                  <h2 className="text-[#858B92] text-sm">
                    View and generate sales reports
                  </h2>
                </div>
                <div>
                  <button
                    className=" border hover:bg-black  hover:text-white  border-[#E8E8E8]  p-3 font-semibold rounded-lg"
                    onClick={() => navigate(`/sales-report`)}
                  >
                    Sales Report
                  </button>
                </div>
              </div>

              <div className="w-full bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
                <div className="flex flex-col">
                  <h1 className=" text-2xl  font-bold">Create New User</h1>
                  <h2 className="text-[#858B92] text-sm">Create a new user</h2>
                </div>
                <div>
                  <button
                    className=" border hover:bg-black  hover:text-white  border-[#E8E8E8]  p-3 font-semibold rounded-lg"
                    onClick={() => navigate(`/create-user`)}
                  >
                    Create User
                  </button>
                </div>
              </div>
              {/* <div className="w-full bg-white shadow border-[#E8E8E8] border flex justify-between flex-col p-4 rounded-lg h-48">
                <div className="flex flex-col">
                  <h1 className=" text-2xl  font-bold">All Invoice</h1>
                  <h2 className="text-[#858B92] text-sm">
                    View all previous invoice
                  </h2>
                </div>
                <div>
                  <button
                    className=" border hover:bg-black  hover:text-white  border-[#E8E8E8]  p-3 font-semibold rounded-lg"
                    onClick={() => navigate(`/view-all-invoices`)}
                  >
                    All Invoives
                  </button>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
