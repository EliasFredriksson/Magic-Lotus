import { AnimatePresence } from "framer-motion";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";

const Router = () => {
  const location = useLocation();
  // LAZY IMPORTS
  const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
  const Landing = lazy(() => import("./pages/Landing/Landing"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));
  const Settings = lazy(() => import("./pages/Settings/Settings"));
  const Search = lazy(() => import("./pages/Search/Search"));

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* LAYOUT FILE */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* NOT FOUND (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
