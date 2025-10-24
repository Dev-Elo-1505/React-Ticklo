import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/Login"
import SignupPage from "./pages/auth/Signup"
import DashboardPage from "./pages/Dashboard"
import TicketsPage from "./pages/TicketsPage"
import { useState } from "react"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("ticketapp_session"))

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session")
    setIsAuthenticated(false)
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth/login" />} />
    <Route path="/tickets" element={isAuthenticated ? <TicketsPage /> : <Navigate to="/auth/login" />} />
    </Routes>
  )
}

export default App