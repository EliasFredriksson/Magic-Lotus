import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./Layout";

const Router = () => {
  // LAZY IMPORTS
  const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
  const Landing = lazy(() => import("./pages/Landing/Landing"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));
  const Settings = lazy(() => import("./pages/Settings/Settings"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* LAYOUT FILE */}
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* NOT FOUND (404) */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
