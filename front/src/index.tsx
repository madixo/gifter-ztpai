import React from "react";

import {RouterProvider} from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import ReactDOM from "react-dom/client";
import {router} from "utils/router";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);

reportWebVitals();
