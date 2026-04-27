import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Expense from "./Pages/Expense";
import Income from "./Pages/Income";
import Budget from "./Pages/Budget";
import Transactions from "./Pages/Transactions";
import Navbar from "./Component/Navbar";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoutes";

function App() {
  const token = localStorage.getItem("Token");

  return (
    <div className="App">
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/Expense"
          element={
            <PrivateRoute>
              <Expense />
            </PrivateRoute>
          }
        />

        <Route
          path="/income"
          element={
            <PrivateRoute>
              <Income />
            </PrivateRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <PrivateRoute>
              <Budget />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Expense />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
