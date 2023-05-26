import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import ControllerView from "./views/Controller/ControllerView";
import CustomController from "./views/Controller/CustomController";
import SunFounderController from "./views/Controller/SunFounderController";
import DatasetView from "./views/Dataset/DatasetView";

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
      {
        path: "dataset",
        element: <DatasetView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
