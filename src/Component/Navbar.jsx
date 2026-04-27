import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("Token");

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <div className="sticky top-0 bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Finance Tracker</h1>

      <div className="flex gap-6 items-center">
        {isLoggedIn && (
          <>
            <Link to="/Expense">Expense</Link>
            <Link to="/income">Income</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/transactions">Transactions</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;