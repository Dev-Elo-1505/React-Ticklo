import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/Login"
import SignupPage from "./pages/auth/Signup"
import DashboardPage from "./pages/Dashboard"
import TicketsPage from "./pages/TicketsPage"
import Footer from "./components/Footer"


const App = () => {
  const isAuthenticated = !!localStorage.getItem("ticketapp_session")


  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <div className="w-full">
          <main className="grow">
            <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth/login" />} />
          <Route path="/tickets" element={isAuthenticated ? <TicketsPage /> : <Navigate to="/auth/login" />} />
            </Routes>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App