import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layout/DasboardLayout";
import ProductPage from "./page/ProductPage";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="underline">
          <HomePage />
        </div>
      ),
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "product",
          element: <ProductPage />,
        },

        {
          path: "user",
          element: <h1>User dashboard</h1>,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
