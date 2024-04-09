import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./common/Loader";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import DefaultLayout from "./Pages/DefaultLayout/DefaultLayout";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/dashboard" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
