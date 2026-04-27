import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Transactions() {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.data || []);
  const incomes = useSelector((state) => state.income.data || []);

  useEffect(() => {
    dispatch({ type: "FETCH_EXPENSES" });
    dispatch({ type: "FETCH_INCOME" });
  }, [dispatch]);

  // 🔥 Merge + add type + sort by date
  const transactions = [
    ...expenses.map((item) => ({ ...item, type: "expense" })),
    ...incomes.map((item) => ({ ...item, type: "income" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6 bg-gray-100 min-h-screen px-20">
      <h2 className="text-2xl font-bold mb-6">Transactions History</h2>

      <div className="grid gap-4">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
          >
            <div className="flex flex-col items-start w-1/3">
              <p className="font-semibold text-lg">{item.category ? item.category : item.source}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>

            <div className="w-1/3 text-center">
              <p className="text-gray-500 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            <div className="w-1/3 text-right">
              <p
                className={`text-xl font-bold ${
                  item.type === "expense" ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.type === "expense" ? "-" : "+"} ₹{item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
