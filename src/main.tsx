import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/landing-page.tsx";
import Dashboard from "./routes/dashboard.tsx";
import ErrorPage from "./routes/error-page.tsx";
import "./index.css";
import { ProjectProvider } from "./providers/ProjectProvider.tsx";
import KanbanPage from "./routes/kanban-page.tsx";
import AboutPage from "./routes/about-page.tsx";
import Resolution from "./charts/resolution_time.tsx";
import { tmp } from "./charts/tmp.ts";
import conv_to_unified from "./utils/parse.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/kanban",
    element: <KanbanPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    // REMOVE THIS ENDPOINT WHEN GRAPHS ARE ACTUALLY USED
    path: "/test",
    element: <Resolution issues={conv_to_unified(tmp).issues} startDate={ new Date(2023,10,14) } endDate={ new Date() }/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </React.StrictMode>,
);
