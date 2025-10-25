import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoTicketOutline,
  IoFolderOpenOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { logout } from "../utils/auth";
import { getTickets } from "../utils/tickets";
import type { Ticket } from "../types";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import ButtonLink from "../components/ButtonLink";
import AppNavbar from "../components/AppNavbar";
import { RiProgress3Line } from "react-icons/ri";

const Dashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      toast.showToast("Failed to load tickets", "error");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadTickets();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);

  await Promise.resolve(logout());
  toast.showToast("You have been logged out", "success");
  navigate("/");
    } catch (error: any) {
      toast.showToast(error?.message ?? "Logout failed", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-4 md:px-12 md:py-6 font-inter mx-auto max-w-[1440px]">
      <AppNavbar isLoading={loading} onLogout={() => setShowConfirm(true)} />
      <main className="mt-4">
        <h1 className="text-lg font-semibold">Welcome there!</h1>
        <p className="text-sm md:text-md">Here's a summary of all your tickets!</p>
        <div className="mt-4">
          <div className="flex gap-2 mb-3 md:block">
            <div className="bg-primary/10 border border-primary/30 rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between">
              <p className="flex items-center gap-2">
                <IoTicketOutline /> Total Tickets
              </p>
              <p className="text-4xl font-bold mt-2">{tickets.length}</p>
            </div>

            <div className="bg-[#fef2f2] border border-[#fca5a1] rounded-md w-full h-32 p-2 md:p-4 flex flex-col justify-between">
              <p className="flex items-center gap-2">
                <IoFolderOpenOutline /> Open Tickets
              </p>
              <p className="text-4xl font-bold mt-2">
                {tickets.filter((t) => t.status === "open").length}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-3 md:block">
            <div className="bg-[#fff7ed] border border-[#f7d56f] rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between">
              <p className="flex items-center gap-2">
                <RiProgress3Line className="text-xl" /> In Progress Tickets
              </p>
              <p className="text-4xl font-bold mt-2">
                {tickets.filter((t) => t.status === "in_progress").length}
              </p>
            </div>
            <div className="bg-[#f0fdf4] border border-[#6fff9a] rounded-md w-full h-32 p-2 md:p-4 md:mb-3 flex flex-col justify-between">
            <p className="flex items-center gap-2">
              <IoCheckmarkCircleOutline /> Closed Tickets
            </p>
            <p className="text-4xl font-bold mt-2">
              {tickets.filter((t) => t.status === "closed").length}
            </p>
          </div>
          </div>

          

          
        </div>
        <ButtonLink
          location="/tickets"
          title="Manage tickets"
          customClass="bg-primary text-white w-full block text-center mt-4"
        />
      </main>

      <Modal
        isOpen={showConfirm}
        title="Confirm logout"
        description={<p>Are you sure you want to log out?</p>}
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
