import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../Redux/Action/loginAction";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LOGIN_REQUEST(loginData));
  };
  useEffect(() => {
    if (loginState.success) {
      window.location.href = "/Expense";
    }
  }, [loginState.success]);

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>
      <div className="flex items-center justify-center mt-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {loginState.msg && (
            <p className="text-red-500 text-center">{loginState.msg}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button className="bg-blue-900 text-white p-3 rounded-lg">
              Login
            </button>
            <p>
              Already have an account?{" "}
              <Link
                className="text-blue-900 font-semibold hover:underline"
                to="/signup"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
