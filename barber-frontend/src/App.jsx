import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Shared/Navbar';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import BarberDashboard from './components/Dashboard/BarberDashboard';
import ClientDashboard from './components/Dashboard/ClientDashboard';

function Routes() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return (
      <div className="auth-container">
        <Login />
        <Register />
      </div>
    );
  }
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'barber') return <BarberDashboard />;
  return <ClientDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes />
    </AuthProvider>
  );
}
