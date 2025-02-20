import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateUserComponent = () => {
  const [formData, setFormData] = useState({ role: "user" });
  const navigate = useNavigate();
  const [allItem, setAllItem] = useState([]);
  const [selectItem, setSelectedItem] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // get user function
  const getData = () => {
    fetch("http://localhost:5001/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        // Include Authorization header if required
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({
      //   userName: formData.username,
      //   phoneNo: formData.phoneNo,
      //   email: formData?.email,
      //   password: formData?.password,
      //   role: formData.role,
      // }),
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          return response.json(); // Only parse JSON if the status is 200
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        setAllItem(data?.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // create user function
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    console.log(token);
    e.preventDefault();
    fetch("http://localhost:5001/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include Authorization header if required
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName: formData.username,
        phoneNo: formData.phoneNo,
        email: formData?.email,
        password: formData?.password,
        role: formData.role,
      }),
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          setFormData({
            username: "",
            phoneNo: "",
            email: "",
            password: "",
            role: "user",
          });
          return response.json(); // Only parse JSON if the status is 200
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        toast.success("sucessfully create user");
        getData();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // update user
  const handleUpdate = (e) => {
    const token = localStorage.getItem("token");
    const { _id, __v, ...rest } = selectItem;
    console.log(token);
    e.preventDefault();
    fetch(`http://localhost:5001/api/v1/user/${selectItem?._id}`, {
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
        getData();
        setIsUpdateModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleDelete = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    fetch(`http://localhost:5001/api/v1/user/${selectItem?._id}`, {
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
        getData();
        setIsDeleteModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  console.log(formData);
  return (
    <div className="w-full h-screen  p-5 bg-[#F3F4F6]">
      <div className=" flex w-full">
        <div
          className="h-10 w-12 bg-black p-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          <FaArrowLeft className=" text-white  w-full h-full " />
        </div>
        <h1 className="text-3xl ml-[40%] font-bold text-center">Create User</h1>
      </div>
      <div className=" flex justify-between mt-10">
        <h1 className="text-xl font-bold">User Information</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">User Name </h1>
            <input
              type="text"
              className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
              placeholder="User Name"
              value={formData.username}
              required
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Email</h1>
            <input
              type="text"
              className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
              placeholder="email"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Phone No</h1>
            <input
              type="text"
              className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
              placeholder="number"
              value={formData.phoneNo}
              required
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Password</h1>
            <input
              type="text"
              required
              className="border w-full border-[#E8E8E8] p-2 placeholder:text-[#87888A] font-semibold text-sm rounded-lg"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="font-semibold">Role</h1>
            <div className="border pr-2 rounded-lg bg-white">
              <select
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                name=""
                id=""
                className="w-full p-2 rounded-lg focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <button
          className="p-2 mt-5 bg-black text-white font-semibold rounded-lg"
          type="submit"
        >
          + Add User
        </button>
      </form>

      <div className="w-full mt-10 bg-white shadow">
        <div className="flex border-b bg-gray-100 border-[#E8E8E8]">
          <div className="w-[20%] p-3">
            <h1 className="font-semibold text-black">Name</h1>
          </div>
          <div className="w-[20%] p-3">
            <h1 className="font-semibold text-black">Email</h1>
          </div>
          <div className="w-[20%] p-3">
            <h1 className="font-semibold text-black">Phone No</h1>
          </div>
          <div className="w-[20%] p-3">
            <h1 className="font-semibold text-black">Role</h1>
          </div>
          <div className="w-[20%] p-3">
            <h1 className="font-semibold text-black">Action</h1>
          </div>
        </div>
        {allItem.length > 0 ? (
          allItem.map((item, index) => (
            <div key={index} className="flex border-b border-[#E8E8E8] hover:bg-slate-300  cursor-pointer">
              <div className="w-[20%] p-3 ">
                <div className="w-full">
                  <h1 className="font-semibold w-full">{item.userName}</h1>
                </div>
              </div>
              <div className="w-[20%] p-3">
                <h1 className="font-semibold">{item.email}</h1>
              </div>
              <div className="w-[20%] p-3">
                <h1 className="font-semibold">{item.phoneNo}</h1>
              </div>
              <div className="w-[20%] p-3">
                <h1 className="font-semibold">{item?.role}</h1>
              </div>
              <div className="w-[20%] p-3 flex gap-4">
                <FaRegPenToSquare
                  className="cursor-pointer"
                  onClick={() => {
                    setIsUpdateModal(true);
                    setSelectedItem(item);
                  }}
                />
                <FaTrashAlt
                  className="cursor-pointer"
                  onClick={() => {
                    setIsDeleteModal(true);
                    setSelectedItem(item);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center mt-10 text-3xl text-[#7A8085]">No User</h1>
        )}
      </div>

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
              Update User
            </h2>

            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-4">
                {/* User Name */}
                <div className="flex flex-col">
                  <label className="font-semibold">User Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="User Name"
                    required
                    value={selectItem?.userName}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        userName: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Email"
                    required
                    value={selectItem?.email}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        email: updatedValue,
                      }));
                    }}
                  />
                </div>

                {/* Phone No */}
                <div className="flex flex-col">
                  <label className="font-semibold">Phone No</label>
                  <input
                    type="tel"
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                    placeholder="Phone No"
                    required
                    value={selectItem?.phoneNo}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        phoneNo: updatedValue,
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
                  <label className="font-semibold">Role</label>
                  <select
                    value={selectItem?.role}
                    onChange={(e) => {
                      const updatedValue = e.target.value;
                      setSelectedItem((prev) => ({
                        ...prev,
                        role: updatedValue,
                      }));
                    }}
                    className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
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

      {/* delete modal  */}
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
