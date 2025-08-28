import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Spin } from "antd";

const ProjectRoutes = () => {
  const { user } = useAuth();

  // NotFound Page
  const NotFound = React.lazy(() => import("./pages/Default/NotFound"));

  // Authentication Pages
  const Login = React.lazy(() => import("./pages/authentication/Login"));
  const Register = React.lazy(() => import("./pages/authentication/Register"));

  // Movies Pages
  const Movies = React.lazy(() => import("./pages/Movies"));
  const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));

  return (
    <React.Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spin />
        </div>
      }
    >
      <Router>
        <Routes>
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

          {/* Authentication */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {user && (
            <>
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/details" element={<MovieDetails />} />
            </>
          )}
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
