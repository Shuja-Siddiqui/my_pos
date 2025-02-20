import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginComponent = () => {
  const [selectedComponent, setSelectedComponent] = useState("user");
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData?.email,
        password: formData?.password,
        role: selectedComponent,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          const error = await response.json();
          toast.error(error.message); // Wait for the error response
          throw new Error(error.message || "An unexpected error occurred");
        }
      })
      .then((data) => {
        toast.success("login sucessfully");
        localStorage.setItem("@role", data?.data?.user?.role);
        localStorage.setItem("token", data?.data?.token);
        navigate(`/dashboard`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <>
      <div className="w-full h-screen bg-[#F3F4F6] flex justify-center items-center">
        <div className="w-[35%] h-[45%] flex justify-between items-center flex-col bg-white shadow-md rounded-lg p-7">
          <div className="flex w-full justify-start flex-col">
            <h1 className="text-3xl font-semibold ">POS Login</h1>
            <h2 className="text-lg  mt-1 text-[#87888A]">
              Entrer your credentials to access the system
            </h2>
            <div className="flex gap-20 mt-2 ">
              <h1
                className={`font-semibold cursor-pointer ${
                  selectedComponent === "user"
                    ? " text-[#87888A]  border-b-2  border-[#E8E8E8]  "
                    : ""
                } `}
                onClick={() => setSelectedComponent("user")}
              >
                User
              </h1>
              <h1
                className={`font-semibold cursor-pointer ${
                  selectedComponent === "admin"
                    ? " text-[#87888A]   border-b-2  border-[#E8E8E8] "
                    : ""
                } `}
                onClick={() => setSelectedComponent("admin")}
              >
                Admin
              </h1>
            </div>
          </div>
          <form
            onSubmit={handleLogin}
            className="w-full h-full flex justify-around flex-col"
          >
            <div className="w-full flex  flex-col gap-5">
              <input
                type="email"
                required
                autoComplete="email"
                className=" w-full rounded-lg p-3 placeholder:text-[#87888A] placeholder:font-semibold border  border-[#E8E8E8]"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="password"
                required
                autoComplete="current-password"
                className=" w-full rounded-lg p-3 placeholder:text-[#87888A] 
              placeholder:font-semibold border border-[#E8E8E8]"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="w-full flex justify-between items-center">
              {/* <button className="py-3 px-4 border-[#E8E8E8] border rounded-lg  font-semibold">
                Cancel
              </button> */}
              <button
                className="py-3 px-4 w-full bg-black text-white rounded-lg font-semibold"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
