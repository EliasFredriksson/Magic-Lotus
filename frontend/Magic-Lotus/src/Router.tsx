import { AnimatePresence } from "framer-motion";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireRole from "./components/RequireRole/RequireRole";
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
  const Admin = lazy(() => import("./pages/Admin/Admin"));
  const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
  const Results = lazy(() => import("./pages/Results/Results"));
  const Card = lazy(() => import("./pages/SingleCard/SingleCard"));

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* LAYOUT FILE */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/card/:id" element={<Card />} />

          <Route element={<RequireRole roles={["user", "admin"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<RequireRole roles={["admin"]} />}>
            <Route path="/admin">
              <Route index element={<Admin />} />
              <Route path="catalog/:name" element={<Catalog />} />
            </Route>
          </Route>

          {/* NOT FOUND (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
