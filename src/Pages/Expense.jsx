import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Expense() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense?.data || []);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_EXPENSES" });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch({
        type: "UPDATE_EXPENSE",
        payload: { id: editId, data: form },
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: form,
      });
    }

    setForm({ amount: "", category: "", description: "" });
  };

  const handleEdit = (item) => {
    setForm({
      amount: Number(item.amount),
      category: item.category,
      description: item.description,
    });
    setEditId(item._id);
  };

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen px-20">
      <div className="bg-white p-6 rounded-xl shadow mb-6  max-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Edit Expense" : "Add Expense"}
          </h3>
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded"
          />

          <button className="bg-blue-900 text-white p-2 rounded">
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {expenses.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.category}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-red-500">₹{item.amount}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    dispatch({
                      type: "DELETE_EXPENSE",
                      payload: item._id,
                    })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
