import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InventoryComponent = () => {
  const [formData, setFormData] = useState();
  const [searchterm, setSearchTerm] = useState();
  const [product, setproduct] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectItem, setSelectedItem] = useState();
  const [categoryData, setCategoryData] = useState();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  // const date = new Date();
  // const formattedDate = date.toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "numeric",
  // });
  const checkRole = localStorage.getItem("@role");
  const addCategory = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5001/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: categoryName,
      }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          throw new Error("Failed to add product");
        }
      })
      .then((data) => {
        toast.success(data?.message);
        getCategory();
        setIsModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getCategory = () => {
    fetch("http://localhost:5001/api/v1/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   email: formData?.email,
      //   password: formData?.password,
      //   role: selectedComponent,
      // }),
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json();
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        setCategoryData(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
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

  const addProduct = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:5001/api/v1/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData?.name,
        price: formData?.price,
        category: formData?.category,
      }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
          localStorage.clear();
          navigate("/");
          toast.error("token expire");
        } else {
          throw new Error("Failed to add product");
        }
      })
      .then((data) => {
        setFormData({
          name: "",
          price: "",
          category: "",
          stock: "",
          dosage: "",
        });
        toast.success("Product added successfully");
        getProduct();
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleUpdate = (e) => {
    const token = localStorage.getItem("token");
    const { _id, __v, ...rest } = selectItem;
    console.log(token);
    e.preventDefault();
    fetch(`http://localhost:5001/api/v1/product/by-id/${selectItem?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Include Authorization header if required
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updatedData: rest }),
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
        getProduct();
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
          throw new Error(response.json());
        }
      })
      .then((data) => {
        toast.success(data?.message);
        getProduct();
        setIsDeleteModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    getCategory();
    getProduct();
  }, []);
  const filterData = (data) => {
    if (!searchterm) return data; // Return the original data if searchterm is empty
    return data?.filter((i) =>
      i?.name?.toLowerCase().includes(searchterm.toLowerCase())
    );
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
        <h1 className="text-3xl ml-[40%] font-bold text-center">Inventory</h1>
      </div>

      <form onSubmit={addProduct}>
        {/* <h1 className="text-2xl font-bold">Inventory</h1> */}
        <div className="w-full grid grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Item</h1>
            <input
              type="text"
              className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
              placeholder="Item Name"
              value={formData?.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
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
          <div className=" w-full  flex justify-start items-end">
            <div className="border  p-2 bg-white rounded-lg">
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
          </div>
        </div>
        <button
          className="p-2 mt-5 bg-black text-white font-semibold rounded-lg"
          type="submit"
        >
          + Add Item
        </button>
      </form>
      <div className="flex justify-end items-end">
        <button
          className="p-2  bg-black text-white font-semibold rounded-lg"
          onClick={() => setIsModal(true)}
        >
          Add Category
        </button>
      </div>

      <div className="w-full mt-5 flex justify-center items-center ">
        <input
          type="search"
          className=" w-1/2 p-2 border focus:outline-none cursor-pointer rounded-lg"
          placeholder="Search..."
          value={searchterm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white shadow">
        <table className={`w-full border  mt-5`}>
          <thead>
            <tr className=" text-start h-[40px] bg-gray-100">
              <th className="pb-2">Item</th>
              <th className="pb-2">Price</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Date\Time</th>
              {checkRole === "admin" && <th className="pb-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filterData(product)?.map((item) => (
              <tr className="border-t h-[36px] shadow-slate-50 hover:bg-slate-300 ">
                <th className="text-base  font-normal ">{item.name} </th>
                <th className="text-base  font-normal">{item?.price}</th>
                <th className="text-base  font-normal ">
                  {item?.category?.name}{" "}
                </th>
                <th className="text-base  font-normal ">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </th>
                {checkRole === "admin" && (
                  <th>
                    <div className="flex justify-center items-center gap-5 ">
                      <BiEdit
                        className="cursor-pointer text-lg hover:text-amber-500 "
                        onClick={() => {
                          setIsUpdateModal(true);
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModal && (
        <div className="fixed flex w-full top-0 h-screen justify-center items-center">
          <div
            className="w-full h-screen right-0   fixed top-0 bg-black opacity-10"
            onClick={() => setIsModal(false)}
          ></div>
          <div className="absolute top-[35%] p-5 shadow-lg rounded-lg w-[30%] h-72 bg-white">
            <div className="flex flex-col gap-3 justify-around items-center w-full h-full">
              <h1 className="text-2xl font-semibold">Add Category</h1>

              <div className="w-full flex justify-center flex-col gap-2">
                <h1 className="text-lg font-semibold">Name</h1>
                <input
                  type="text"
                  className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
                  placeholder="Item Name"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              {/* buttons */}
              <div className="flex justify-around  w-full items-center">
                <button
                  className="px-5 w-[30%] hover:opacity-90 hover:scale-105 py-2 bg-green-500 rounded-lg text-white"
                  onClick={addCategory}
                >
                  Submit
                </button>
                <button
                  className="px-5 w-[30%] hover:opacity-90 hover:scale-105 py-2 bg-red-500 rounded-lg text-white "
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* upadte modal */}
      {isUpdateModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsUpdateModal(false)} // Close modal when clicking the overlay
          ></div>

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
                    value={selectItem?.name}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        name: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                  <label className="font-semibold">Price</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Price"
                    required
                    value={selectItem?.price}
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
                <div className="flex flex-col">
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
                </div>
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
