import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}><ChakraProvider>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </ChakraProvider></QueryClientProvider>

  ,
);
