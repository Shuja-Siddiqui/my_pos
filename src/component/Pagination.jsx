import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = ({
  data,
  itemsPerPage,
  setViewModal,
  setSelectedItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the pages to display (current, previous, next)
  const pagesToDisplay = [
    currentPage > 1 ? currentPage - 1 : null,
    currentPage,
    currentPage < totalPages ? currentPage + 1 : null,
  ].filter(Boolean); // Filter out null values
  console.log(pagesToDisplay);
  return (
    <div>
      {/* Display the current page's data */}
      {/* <ul>
          {currentData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul> */}
      <table className={`w-full border bg-white shadow  mt-5`}>
        <thead>
          <tr className=" text-start h-[30px]  bg-gray-100 ">
            <th className="pb-2">Item</th>
            <th className="pb-2">Quantity</th>
            <th className="pb-2">Total Price</th>
            <th className="pb-2">Reason</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item) => (
            <tr className="border-t  shadow-slate-50 h-[36px] hover:bg-slate-300 cursor-pointer">
              <th className="text-base  font-normal ">
                {item?.product?.name}{" "}
              </th>
              <th className="text-base  font-normal ">{item?.quantity} </th>
              <th className="text-base  font-normal">
                {item?.totalReturnPrice}
              </th>
              <th className="text-base  font-normal">
                {item?.reason?.substring(0, 15)}
                {item?.reason?.length > 15 && "....."}
              </th>
              <th className="text-base  font-normal ">
                {" "}
                {new Date(item?.returnedAt).toLocaleDateString()}
              </th>
              <th>
                <div className="flex justify-center items-center gap-5 ">
                  <BsEyeFill
                    className="cursor-pointer text-lg hover:text-amber-500 "
                    onClick={() => {
                      setViewModal(true);
                      setSelectedItem(item);
                    }}
                  />
                  {/* <MdDelete
                       className="cursor-pointer text-lg hover:text-amber-500 "
                       onClick={() => {
                         setIsDeleteModal(true);
                         setSelectedItem(item);
                       }}
                     /> */}
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div
        className="pagination justify-end"
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "5px 10px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <FaArrowLeft />
        </button>

        {/* Page numbers */}
        <span
          style={{
            padding: "5px 10px",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#333",
          }}
        >
          {currentPage} of {totalPages}
        </span>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className=""
          style={{
            padding: "5px 10px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
