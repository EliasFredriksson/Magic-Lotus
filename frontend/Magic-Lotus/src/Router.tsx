import { FunctionComponent, lazy, LazyExoticComponent, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./Layout";

type IRoute = {
  path: string;
  component: LazyExoticComponent<React.FunctionComponent>;
};
type IStaticRoutes = {
  [key: string]: FunctionComponent;
};

// ROUTES TO LOAD WITH EAGER (Not lazy)
// SPECIFY WHICH FILES TO LOAD
const LOADED_ROUTES: Record<string, any> = import.meta.glob(
  "/src/pages/(_app|404)/index.tsx",
  {
    eager: true,
  }
);
// ROUTES TO LOAD WITH LAZY
const LAZY_ROUTES: Record<string, () => any> = import.meta.glob(
  "/src/pages/**/[a-zA-Z[]*.tsx"
);

const Router = () => {
  // CONVERT LOADED ROUTES INTO A IStaticRoutes OBJECT
  const loaded_routes: IStaticRoutes = Object.keys(LOADED_ROUTES).reduce(
    (preserved, route) => {
      const key = route
        .replace(/\/src\/pages\/|\.tsx$/g, "")
        .toLowerCase()
        .replace("/index", "");
      return { ...preserved, [key]: LOADED_ROUTES[route].default };
    },
    {}
  );
  // CONVERT LOADED ROUTES INTO A LIST OF IRoutes OBJECTS
  const lazy_routes: IRoute[] = Object.keys(LAZY_ROUTES).map((route) => {
    const path = route
      .replace(/\/src\/pages|index|\.tsx$/g, "")
      .replace(/\[\.{3}.+\]/, "*")
      .replace(/\[(.+)\]/, ":$1")
      .toLowerCase()
      .replace("/index", "");

    return { path, component: lazy(LAZY_ROUTES[route]) };
  });

  // ########## LOADED ROUTES ##########
  const NotFound = loaded_routes?.["404"] || <></>;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* LAYOUT FILE */}
          <Route element={<Layout />}>
            {/* ### MAP OUR LAZY ROUTES ### */}
            {lazy_routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
