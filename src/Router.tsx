import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type IRoute = {
  path: string;
  component: React.LazyExoticComponent<React.FunctionComponent>;
};
type IStaticRoutes = {
  [key: string]: React.FunctionComponent;
};

// ROUTES TO LOAD WITH EAGER (Not lazy)
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

const lazy_routes: IRoute[] = Object.keys(LAZY_ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1")
    .toLowerCase()
    .replace("/index", "");

  return { path, component: lazy(LAZY_ROUTES[route]) };
});

const NotFound = loaded_routes?.["404"] || <></>;
const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading..."}>
        <Routes>
          {lazy_routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
