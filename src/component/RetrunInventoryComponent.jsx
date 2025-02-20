import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination } from "./Pagination";

export const RetrunInventoryComponent = () => {
  const [returnProduct, setReturnProduct] = useState();
  const [formData, setFormData] = useState();
  const [searchterm, setSearchTerm] = useState();
  const [product, setproduct] = useState();
  const [viewModal, setViewModal] = useState();
  // const [categoryName, setCategoryName] = useState("");
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectItem, setSelectedItem] = useState();
  // const [categoryData, setCategoryData] = useState();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  // const addCategory = () => {
  //   const token = localStorage.getItem("token");
  //   fetch("http://localhost:5001/api/v1/category", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       name: categoryName,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status === 200 || 201) {
  //         return response.json();
  //       } else {
  //         throw new Error("Failed to add product");
  //       }
  //     })
  //     .then((data) => {
  //       toast.success(data?.message);
  //       getCategory();
  //       setIsModal(false);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  // const getCategory = () => {
  //   fetch("http://localhost:5001/api/v1/category", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify({
  //     //   email: formData?.email,
  //     //   password: formData?.password,
  //     //   role: selectedComponent,
  //     // }),
  //   })
  //     .then((response) => {
  //       if (response.status === 200 || 201) {
  //         return response.json();
  //       } else {
  //         throw new Error("Failed to login");
  //       }
  //     })
  //     .then((data) => {
  //       setCategoryData(data?.data);
  //     })
  //     .catch((error) => {
  //       toast.error(error?.message);
  //     });
  // };

  const getReturnProduct = () => {
    fetch("http://localhost:5001/api/v1/returns", {
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

  const addProduct = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:5001/api/v1/returns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: formData?._id,
        returnPrice: formData?.price,
        quantity: formData?.quantity,
        reason: formData?.reason,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
          localStorage.clear();
          navigate(`/`);
        } else {
          throw new Error("Failed to add product");
        }
      })
      .then((data) => {
        setSearchTerm("");
        setFormData({
          name: "",
          price: "",
          reason: "",
          quantity: "",
        });
        toast.success("Product added successfully");
        getReturnProduct();
        getProduct();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleUpdate = (e) => {
    const token = localStorage.getItem("token");
    console.log(token);
    e.preventDefault();
    fetch(`http://localhost:5001/api/v1/returns`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Include Authorization header if required
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        returnAmount: selectItem?.totalReturnPrice,
        product: selectItem?._id,
        quantity: parseInt(selectItem?.quantity),
      }),
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json(); // Only parse JSON if the status is 200
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        toast.success("Sucessfully Update");
        getReturnProduct();
        setIsUpdateModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDelete = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    fetch(`http://localhost:5001/api/v1/product/by-id/${selectItem?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json();
        } else {
          localStorage.clear();
          navigate(`/`);
          throw new Error(response.json());
        }
      })
      .then((data) => {
        toast.success(data?.message);
        getReturnProduct();
        setIsDeleteModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
        setproduct(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  useEffect(() => {
    // getCategory();
    getProduct();
    getReturnProduct();
  }, []);

  const filteredMedications = product?.filter((med) => {
    const matchesSearch =
      med?.name?.toLowerCase().includes(searchterm?.toLowerCase()) ||
      med?.category?.name.toLowerCase().includes(searchterm?.toLowerCase());
    // const matchesCategory =
    //   !categoryName || med?.category?.name === categoryName;
    return matchesSearch;
  });

  const addTo = (item) => {
    setFormData(item);
    setSearchTerm(item?.name);
    setIsModal(false);
  };
  return (
    <div className="p-5 bg-[#F3F4F6] min-h-screen">
      <div className=" flex w-full">
        <div
          className="h-10 w-12 bg-black p-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          <FaArrowLeft className=" text-white  w-full h-full " />
        </div>
        <h1 className="text-3xl ml-[35%] font-bold text-center">
          Return Inventory
        </h1>
      </div>
      <div className="flex justify-end items-center w-full">
        <button
          className="p-2  bg-black text-white font-semibold rounded-lg"
          onClick={() => navigate(`/generateInvoice`)}
        >
          Return Invoice Page
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Item</h1>
          <div className="relative">
            <input
              type="search"
              placeholder="Search medications..."
              value={searchterm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsModal(true);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none "
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <div className="overflow-x-auto w-full max-h-96 overflow-y-auto absolute bg-white shadow top-14">
              {searchterm?.length > 0 && (
                <table className="min-w-full relative top-0 z-50">
                  {filteredMedications?.length > 0 && isModal ? (
                    <>
                      <thead className="sticky top-0">
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedications?.map((medication, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{medication.name}</td>
                            <td className="px-4 py-2">
                              {medication.category?.name}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {medication.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                onClick={() => addTo(medication)}
                                // disabled={medication.stock === 0}
                                className={`inline-flex items-center px-3 py-1 rounded ${
                                  medication.stock === 0
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                                }`}
                              >
                                <FaPlus className="mr-1" size={12} />
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    ""
                  )}
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Price</h1>
          <input
            type="number"
            className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
            placeholder="Price"
            required
            value={formData?.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Quantity</h1>
          <input
            type="number"
            className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
            placeholder="qunatity"
            value={formData?.quantity}
            required
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Reason</h1>
          <textarea
            type="text"
            className="border w-full border-[#E8E8E8] p-2 h-32 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
            placeholder="Retrun Reason"
            value={formData?.reason}
            required
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
          />
        </div>
      </div>
      {/* <div className="mt-3 w-full flex justify-between">
          <div className="border  p-2 rounded-lg">
            <select
              name=""
              id=""
              required
              className=" border-none focus:outline-none  flex items-center"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData?.category}
            >
              <option value="">Choose Category</option>
              {categoryData?.map((i) => (
                <>
                  <option value={i._id}>{i?.name}</option>
                </>
              ))}
            </select>
          </div>
          <div>
            <button
              className="p-2  bg-black text-white font-semibold rounded-lg"
              onClick={() => setIsModal(true)}
            >
              Add Category
            </button>
          </div>
        </div> */}
      <button
        className="p-2 mt-5 bg-black text-white font-semibold rounded-lg"
        type="submit"
        onClick={addProduct}
      >
        + Add Item
      </button>

      {/* return product tabel */}
      <Pagination
        data={returnProduct}
        itemsPerPage={10}
        setViewModal={setViewModal}
        setSelectedItem={setSelectedItem}
      />
      {/* <table className={`w-full border  border-black mt-5`}>
        <thead>
          <tr className=" text-start ">
            <th className="pb-2">Item</th>
            <th className="pb-2">Quantity</th>
            <th className="pb-2">Total Price</th>
            <th className="pb-2">Reason</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {returnProduct?.map((item) => (
            <tr className="border-t border-[#232323] shadow-slate-50 ">
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
                      setIsModal(true);
                      setSelectedItem(item);
                    }}
                  />
                  <MdDelete
                    className="cursor-pointer text-lg hover:text-amber-500 "
                    onClick={() => {
                      setIsDeleteModal(true);
                      setSelectedItem(item);
                    }}
                  />
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table> */}

      {viewModal && (
        <div className="fixed flex w-full top-0 h-screen justify-center items-center">
          <div
            className="w-full h-screen right-0   fixed top-0 bg-black opacity-10"
            onClick={() => setViewModal(false)}
          ></div>
          <div className="absolute top-[35%] p-5 shadow-lg rounded-lg w-[30%] min-h-72 bg-white">
            <div className="flex flex-col gap-3 relative justify-around items-center w-full h-full">
              <button
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-800"
                onClick={() => setViewModal(false)}
              >
                ✖
              </button>
              <h1 className="text-2xl font-semibold">View Inventory</h1>
              <div className="flex gap-1 items-center w-full ">
                <label className="font-bold text-xl">Retrun Date:</label>
                <p> {new Date(selectItem?.returnedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1 items-baseline w-full ">
                <label className="font-bold text-xl text-center">
                  Item Name :
                </label>
                <p>{selectItem?.product?.name}</p>
              </div>
              <div className="flex gap-1 items-baseline w-full ">
                <label className="font-bold text-xl text-center">
                  Quantity :
                </label>
                <p>{selectItem?.quantity}</p>
              </div>
              <div className="flex gap-1 items-baseline w-full ">
                <label className="font-bold text-xl text-center">
                  Total Price :
                </label>
                <p>{selectItem?.totalReturnPrice}</p>
              </div>
              <div className="flex gap-1 items-baseline w-full ">
                <label className="font-bold text-xl text-center">Reason:</label>
                <p>{selectItem?.reason}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* upadte modal */}
      {isUpdateModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Overlay */}

          {/* Modal Content */}
          <div className="relative bg-white w-[90%] max-w-[500px] p-5 rounded-lg shadow-lg z-50">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Item
            </h2>

            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-4">
                {/* User Name */}
                <div className="flex flex-col">
                  <label className="font-semibold">Item Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Medicine Name"
                    required
                    value={selectItem?.product.name}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        name: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-semibold">Qunatity</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Stock"
                    required
                    value={selectItem?.quantity}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        quantity: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Phone No */}
                <div className="flex flex-col">
                  <label className="font-semibold">TotalReturnPrice</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Price"
                    required
                    value={selectItem?.totalReturnPrice}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        price: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Password */}
                {/* <div className="flex flex-col">
                  <label className="font-semibold">Password</label>
                  <input
                    type="password"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div> */}

                {/* Role */}
                {/* <div className="flex flex-col">
                  <label className="font-semibold">Category</label>
                  <select
                    value={selectItem?.category?.name}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        category: updatedValue,
                      }));
                    }}
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                  >
                    {categoryData?.map((i) => (
                      <>
                        <option value={i._id}>{i?.name}</option>
                      </>
                    ))}
                  </select>
                </div> */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black hover:text-black border text-white font-semibold py-2 mt-4 rounded-lg hover:bg-white hover:border-black hover:border"
              >
                Update
              </button>
            </form>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsUpdateModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {isDeleteModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsDeleteModal(false)} // Close modal when clicking the overlay
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-[90%] max-w-[350px] p-5 rounded-lg shadow-lg z-50">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsDeleteModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Delete User
            </h2>
            <div className="flex justify-around">
              <button
                className="p-2 mt-5 bg-black text-white font-semibold rounded-lg"
                onClick={handleDelete}
              >
                Confrim
              </button>
              <button
                className="p-2 mt-5 bg-black text-white font-semibold rounded-lg"
                onClick={() => setIsDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
