import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Feed1 from "./Pages/Feed1";

// Define the types for the router paths and elements (optional, but can help with type safety)
const router = createBrowserRouter([
  { path: "/", element: <Register /> },
  { path: "/Login", element: <Login /> },
  { path: "/feed", element: <Feed1 /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </>
);
