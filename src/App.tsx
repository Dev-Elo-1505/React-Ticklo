import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession } from "./utils/auth";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import DashboardPage from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";
import Footer from "./components/Footer";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!getSession()
  );

  useEffect(() => {
    function onAuthChange() {
      setIsAuthenticated(!!getSession());
    }
    window.addEventListener("ticketapp_auth_changed", onAuthChange);
    return () =>
      window.removeEventListener("ticketapp_auth_changed", onAuthChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <div
        aria-hidden
        className="fixed -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-30 md:opacity-40"
        style={{ background: "var(--color-primary, #5bb0fe)", zIndex: 0 }}
      />
      <div
        aria-hidden
        className="fixed -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none blur-2xl opacity-20 md:opacity-30"
        style={{ background: "rgba(91,176,254,0.18)", zIndex: 0 }}
      />
      <main className="flex-1 relative z-10">
        <div className="mx-auto w-full ">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/auth/login" />
                )
              }
            />
            <Route
              path="/tickets"
              element={
                isAuthenticated ? (
                  <TicketsPage />
                ) : (
                  <Navigate to="/auth/login" />
                )
              }
            />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
