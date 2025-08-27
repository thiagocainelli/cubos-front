import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ProjectRoutes = () => {
  // NotFound Page
  const NotFound = React.lazy(() => import("./pages/Default/NotFound"));

  // Authentication Pages
  const Login = React.lazy(() => import("./pages/authentication/Login"));
  const ResetPassword = React.lazy(
    () => import("./pages/authentication/ResetPassword")
  );
  const ForgotPassword = React.lazy(
    () => import("./pages/authentication/ForgotPassword")
  );
  const Register = React.lazy(() => import("./pages/authentication/Register"));

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

          {/* Authentication */}
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
