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
import { AuthProvider } from "./providers/AuthProvider.tsx";
import Callback from "./routes/callback-page.tsx";
import Overview from "./routes/overview.tsx";
import Board from "./routes/board.tsx";
import Graphs from "./routes/graphs.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";

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
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "board",
        element: <Board />,
      },
      {
        path: "graphs",
        element: <Graphs />,
      },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <RouterProvider router={router} />
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
);
