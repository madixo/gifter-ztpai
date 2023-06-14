import React from "react";

import {RouterProvider} from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import ReactDOM from "react-dom/client";
import {router} from "utils/router";

import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

reportWebVitals();
