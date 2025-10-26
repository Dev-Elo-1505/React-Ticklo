import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useEffect, useState } from "react";
import { useToast } from "../components/Toast";
import Modal from "../components/Modal";
import AppNavbar from "../components/AppNavbar";
import newTicketImg from "../assets/newTicket.svg?raw";
import Button from "../components/Button";
import CreateTicket from "../components/CreateTicket";
import { type Ticket } from "../types";
import {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} from "../utils/tickets";
import ButtonLink from "../components/ButtonLink";

const TicketsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCreateTicket, setShowTicket] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getTickets();
        setTickets(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSaveTicket = async (data: Ticket) => {
    try {
      setLoading(true);
      if (editingTicket) {
        const updated = await updateTicket(editingTicket.id!, {
          title: data.title,
          description: data.description,
          status: data.status,
        });
        setTickets((s) => s.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTicket(null);
        toast.showToast("Ticket updated", "success");
      } else {
        const created = await createTicket({
          title: data.title,
          description: data.description,
          status: data.status,
        });
        setTickets((s) => [created, ...s]);
        toast.showToast("Ticket created", "success");
      }
      setShowTicket(false);
    } catch (error: any) {
      toast.showToast(error?.message ?? "Failed to save ticket", "error");
    } finally {
      setLoading(false);
    }
  };

  const requestEdit = (t: Ticket) => {
    setEditingTicket(t);
    setShowTicket(true);
  };

  const requestDelete = (t: Ticket) => {
    setDeletingTicket(t);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTicket) return;
    try {
      setLoading(true);
      await deleteTicket(deletingTicket.id!);
      setTickets((s) => s.filter((tk) => tk.id !== deletingTicket.id));
      toast.showToast("Ticket deleted", "success");
    } catch (err: any) {
      toast.showToast(err?.message ?? "Delete failed", "error");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setDeletingTicket(null);
    }
  };

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
    <div className="p-5 md:px-12 md:py-6 font-inter mx-auto max-w-[1440px]">
      <AppNavbar isLoading={loading} onLogout={() => setShowConfirm(true)} />
      <main className="mt-6 flex flex-col items-center justify-center">
        {tickets.length === 0 && (
          <>
            <div>
              <div
                aria-hidden={true}
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    const raw = newTicketImg ?? "";
                    const withPrimary = raw.replace(
                      /#6c63ff/gi,
                      "var(--color-primary,#5bb0fe)"
                    );
                    return withPrimary.replace(/<svg([^>]*)>/i, (_m, attrs) => {
                      const cleaned = attrs.replace(
                        /\s(width|height)="[^"]*"/gi,
                        ""
                      );
                      return `<svg${cleaned} style="width:100%;height:auto;display:block;">`;
                    });
                  })(),
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-light text-sm mb-2">
                Get's Started by Creating a New Ticket
              </h3>
              <Button
                title="Create Ticket"
                onClick={() => {
                  setShowTicket(true);
                }}
              />
            </div>
          </>
        )}

        {tickets.length > 0 && (
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h2 className="text-lg font-semibold md:mb-4">Recent Tickets</h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <ButtonLink
                  title="Go to Dashboard"
                  location="/dashboard"
                  customClass="bg-primary text-white text-center w-full md:w-36  mb-2 mt-2"
                />
                <Button
                  title="Create Ticket"
                  onClick={() => {
                    setShowTicket(true);
                  }}
                  customClass="w-full md:w-32"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tickets.map((tk) => (
                <div
                  key={tk.id}
                  className="border shadow border-white/20 rounded-md p-4 bg-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tk.title}</h3>
                      <div className="flex items-center gap-2">
                        
                        <span
                          className={`px-2 py-1 rounded-full flex items-center justify-center text-xs font-semibold capitalize ${
                            tk.status === "open"
                              ? "bg-green-300/50 text-green-900"
                              : tk.status === "in_progress"
                              ? "bg-amber-300/50 text-amber-900"
                              : "bg-gray-300/50 text-gray-900"
                          }`}
                        >
                          {tk.status.replace("_", " ")}
                        </span>
                        
                      </div>
                    </div>
                    {tk.description && (
                      <p className="mt-2 text-sm text-gray-400 truncate">
                        {tk.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <Button
                      title="Edit"
                      onClick={() => requestEdit(tk)}
                      customClass="rounded-md w-20"
                    />
                    <Button
                      title="Delete"
                      onClick={() => requestDelete(tk)}
                      customClass="rounded-md bg-red-500 w-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
      <Modal
        isOpen={showDeleteConfirm}
        title="Confirm delete"
        description={<p>Are you sure you want to delete this ticket?</p>}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        loading={loading}
      />
      <CreateTicket
        onOpen={showCreateTicket}
        onCancel={() => {
          setShowTicket(false);
          setEditingTicket(null);
        }}
        onCreate={handleSaveTicket}
        initialData={editingTicket}
        submitText={editingTicket ? "Update" : "Create"}
      />
    </div>
  );
};

export default TicketsPage;
