import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetChart from "../Component/BudgetChart";

export default function Budget() {
  const dispatch = useDispatch();
  const budgetStatus = useSelector((state) => state.budget?.data || []);

  const [form, setForm] = useState({
    category: "",
    limit: "",
    month: "",
    year: "",
  });

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const now = new Date();

    dispatch({
      type: "FETCH_BUDGET_STATUS",
      payload: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_BUDGET",
      payload: {
        category: form.category,
        limit: Number(form.limit),
        month: Number(form.month),
        year: Number(form.year),
      },
    });

    setTimeout(() => {
      dispatch({
        type: "FETCH_BUDGET_STATUS",
        payload: {
          month: Number(form.month),
          year: Number(form.year),
        },
      });
    }, 500);

    setForm({
      category: "",
      limit: "",
      month: "",
      year: "",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-6">
        <div className="w-1/2 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Add Budget</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Budget Limit"
              value={form.limit}
              onChange={(e) => setForm({ ...form, limit: e.target.value })}
              className="border p-2 rounded"
            />

            <select
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">Select Month</option>
              {months.map((m, i) => (
                <option key={i + 1} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Year (e.g. 2026)"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="border p-2 rounded"
            />

            <button className="bg-blue-900 text-white p-2 rounded">
              Save Budget
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Budget Chart</h3>
          <BudgetChart data={budgetStatus} />
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {budgetStatus.map((item, index) => {
          const percentage = item.percentage;
          const cappedPercentage = Math.min(percentage, 100);
          const isOver = percentage > 100;

          return (
            <div key={index} className="bg-white p-4 shadow rounded-xl">
              <h3 className="font-bold text-lg">{item.category}</h3>

              <div className="flex justify-between">
                <p>Budget: ₹{item.budget}</p>
                <p>Spent: ₹{item.spent}</p>

                <p className={isOver ? "text-red-500 font-semibold" : ""}>
                  Remaining: ₹
                  {isOver ? item.budget - item.spent : item.remaining}
                </p>
              </div>

              <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                <div
                  style={{ width: `${cappedPercentage}%` }}
                  className={`h-2 rounded ${
                    isOver ? "bg-red-500" : "bg-green-500"
                  }`}
                />
              </div>

              <p className={`text-sm mt-1 ${isOver ? "text-red-500" : ""}`}>
                {percentage}% used
              </p>

              {isOver && (
                <p className="text-xs text-red-600 mt-1">Budget exceeded</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
