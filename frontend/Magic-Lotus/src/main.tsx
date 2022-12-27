import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./contexts/SearchContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SearchContextProvider>
          <Router />
        </SearchContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
