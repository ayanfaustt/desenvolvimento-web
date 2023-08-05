import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global-styles.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import { UserProvider } from "./hooks/useContextUserId";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
