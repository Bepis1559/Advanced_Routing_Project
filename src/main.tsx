import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routers/router.tsx";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
