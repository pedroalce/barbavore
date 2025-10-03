import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Shared/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Shared/Loader";

function Layout() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}