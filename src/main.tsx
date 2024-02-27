import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap the appliaction with redux provider to access all
    state available in our store anywhere in the application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
