import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../components/Button";
import { logout } from "../utils/auth";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await Promise.resolve(logout());
      toast.showToast("You have been logged out", "success");
      navigate("/auth/login");
    } catch (error: any) {
      toast.showToast(error?.message ?? "Logout failed", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-4 md:px-12 md:py-6">
      <nav className="flex justify-between items-center font-inter">
        <Link to="/" className="text-xl font-bold md:text-2xl text-primary">
          Ticklo
        </Link>
        <div className="flex gap-2">
          <Button
            title="Log out"
            customClass="bg-red-500 rounded-md md:w-32"
            onClick={() => setShowConfirm(true)}
            disabled={loading}
          />
        </div>
      </nav>
      <main className="mt-4"></main>

      <Modal
        isOpen={showConfirm}
        title="Confirm logout"
        description={
          <p>
            Are you sure you want to log out? 
          </p>
        }
        confirmText="Log out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
