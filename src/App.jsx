import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Loader from "./common/Loader";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import DefaultLayout from "./Pages/DefaultLayout/DefaultLayout";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./Layout/PrivateRoute";
import DashboardFront from "./components/DashboardFront";
import Random from "./components/Random";
const App = () => {
  return (
    <BrowserRouter>
      <>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DefaultLayout />}>
              <Route index element={<DashboardFront />} />
              <Route
                path="create-shoes"
                element={
                  <Suspense fallback={<Loader />}>
                    <Random />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
