import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Removed StrictMode — it causes Supabase auth lock conflicts
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
