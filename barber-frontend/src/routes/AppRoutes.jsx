import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Páginas
import LandingPage from "../components/LandingPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import ClientDashboard from "../components/Dashboard/ClientDashboard";
import BarberDashboard from "../components/Dashboard/BarberDashboard";
import Loader from "../components/Shared/Loader";
import Navbar from "../components/Shared/Navbar";

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <Router>
      {/* Navbar sempre visível */}
      <Navbar />

      <Routes>
        {/* Público */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard/client" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard/client" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protegido */}
        <Route
          path="/dashboard/client"
          element={user ? <ClientDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/barber"
          element={user ? <BarberDashboard /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
