import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ControllerView from "./views/Controller/ControllerView";
import CustomController from "./views/Controller/CustomController";
import SunFounderController from "./views/Controller/SunFounderController";
import DatasetView from "./views/Dataset/DatasetView";
import { RaspiContextProvider } from "./lib/raspi";

const router = createHashRouter([
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
        element: (
          <RaspiContextProvider>
            <ControllerView />
          </RaspiContextProvider>
        ),
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
