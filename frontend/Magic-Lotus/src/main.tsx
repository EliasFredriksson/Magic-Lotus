import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./contexts/SearchContext";
import { NavigateContextProvider } from "./contexts/NavigateContext";
import { UtilityContextProvider } from "./contexts/UtilityContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilityContextProvider>
        <AuthContextProvider>
          <NavigateContextProvider>
            <SearchContextProvider>
              <Router />
            </SearchContextProvider>
          </NavigateContextProvider>
        </AuthContextProvider>
      </UtilityContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
