import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { pages } from "../Constants.jsx";

const VideoGenerationScreen = lazy(() => import("../Screens/VideoGenerationScreen.jsx"));
const ImageGenerationScreen = lazy(() => import("../Screens/ImageGenerationScreen.jsx"));
const BackgroundGeneratorScreen = lazy(() => import("../Screens/BackgroundGeneratorScreen.jsx"));
const BackgroundRemoverScreen = lazy(() => import("../Screens/BackgroundRemoverScreen.jsx"));
const ImageToPdfScreen = lazy(() => import("../Screens/ImageToPdfScreen.jsx"))
const CategoriesScreen = lazy(() => import("../Screens/CategoriesScreen.jsx"))
const CategoriesSection = lazy(() => import("../Screens/CategoriesSection.jsx"));
const ToolsScreen = lazy(() => import("../Screens/ToolsScreen.jsx"));
const Home = lazy(() => import("../Screens/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <ToolsScreen />
            <CategoriesSection />
          </>
        ),
      },
      {
        path: pages[1],
        element:<CategoriesScreen />,
      },
      {
        path: pages[2],
        element: <ToolsScreen/>,
      },
      {
        path:"ImageToPdfScreen",
        element: <ImageToPdfScreen/>,
      },
      {
        path:"BackgroundRemoverScreen",
        element: <BackgroundRemoverScreen/>,
      },
      {
        path:"BackgroundGeneratorScreen",
        element: <BackgroundGeneratorScreen/>,
      },
      {
        path:"ImageGenerationScreen",
        element: <ImageGenerationScreen/>,
      },
      {
        path:"VideoGenerationScreen",
        element: <VideoGenerationScreen/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
