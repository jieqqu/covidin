import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //React18 StrictMode嚴格模式下會引響useEffect render 兩次
  // <React.StrictMode>
    <>
      <CssBaseline />
      <App />
    </>
  // </React.StrictMode>
);
