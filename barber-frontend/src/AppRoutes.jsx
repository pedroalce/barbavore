import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";

import AdminDashboard from "../components/Dashboard/AdminDashboard";
import BarberDashboard from "../components/Dashboard/BarberDashboard";
import ClientDashboard from "../components/Dashboard/ClientDashboard";

import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rotas protegidas */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/barber"
        element={
          <PrivateRoute allowedRoles={["barber"]}>
            <BarberDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/client"
        element={
          <PrivateRoute allowedRoles={["client"]}>
            <ClientDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}