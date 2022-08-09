import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Number.POSITIVE_INFINITY,
            retry: false,
        }
    }
});

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App/>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
