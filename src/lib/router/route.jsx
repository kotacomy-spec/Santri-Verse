import { createBrowserRouter } from "react-router-dom";
import App from "@/pages/home";

export const routes = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
]);
