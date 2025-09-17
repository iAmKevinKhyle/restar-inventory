import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AntdApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdApp>
  </StrictMode>
);
