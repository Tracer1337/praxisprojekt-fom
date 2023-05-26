import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import ControllerView from "./views/Controller/ControllerView";
import CustomController from "./views/Controller/CustomController";
import SunFounderController from "./views/Controller/SunFounderController";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Navigate to="/controller/custom" />,
        index: true,
      },
      {
        path: "controller",
        element: <ControllerView />,
        children: [
          {
            path: "custom",
            element: <CustomController />,
          },
          {
            path: "sunfounder",
            element: <SunFounderController />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
