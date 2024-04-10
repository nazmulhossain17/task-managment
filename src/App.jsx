import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Loader from "./common/Loader";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import DefaultLayout from "./Pages/DefaultLayout/DefaultLayout";
import { Toaster } from "react-hot-toast";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/dashboard" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
