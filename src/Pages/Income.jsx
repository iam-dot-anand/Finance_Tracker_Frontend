import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Income() {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.income?.data || []);

  const [form, setForm] = useState({
    amount: "",
    source: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_INCOME" });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch({
        type: "UPDATE_INCOME",
        payload: { id: editId, data: form },
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_INCOME",
        payload: form,
      });
    }

    setForm({ amount: "", source: "", description: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };
  const INCOME_SOURCES = [
    "Salary",
    "Business",
    "Freelance",
    "Investment",
    "Gift",
    "Other",
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen px-20">
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-3 max-w-full"
        >
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Update " : "Add "} Income
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
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Source</option>

            {INCOME_SOURCES.map((item) => (
              <option key={item} value={item}>
                {item}
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
            {editId ? "Update" : "Add"} Income
          </button>
        </form>
      </div>

      {incomes.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 mb-3 rounded-xl shadow flex justify-between"
        >
          <div>
            <p className="font-bold">{item.source}</p>
            <p>{item.description}</p>
          </div>

          <div>
            <p className="text-green-600 font-bold">₹{item.amount}</p>

            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-400 px-2 py-1 mr-2"
            >
              Edit
            </button>

            <button
              onClick={() =>
                dispatch({ type: "DELETE_INCOME", payload: item._id })
              }
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
