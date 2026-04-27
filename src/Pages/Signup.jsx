import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../Redux/Action/signupAction";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupState = useSelector((state) => state.signup);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    dispatch(SIGNUP_REQUEST(form));
  };

  useEffect(() => {
    if (signupState.success) {
      navigate("/Expense"); // auto redirect
    }
  }, [signupState.success, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>
      <div className="flex items-center justify-center mt-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

          {signupState.msg && (
            <p className="text-red-500 text-center">{signupState.msg}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button className="bg-blue-900 text-white p-3 rounded-lg">
              Signup
            </button>
            <p>
              Don't have an account?{" "}
              <Link
                className="text-blue-900 font-semibold hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
