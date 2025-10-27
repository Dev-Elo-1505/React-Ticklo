import type { Ticket } from "../types";
import { getSession } from "./auth";

const TICKETS_KEY = "mock_tickets";

function readTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeTickets(tickets: Ticket[]) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export async function getTickets(): Promise<Ticket[]> {
  // simulate latency
  await new Promise((r) => setTimeout(r, 150));
  const session = getSession();
  if (!session) return [];
  const all = readTickets();
  // return tickets that belong to the current session's email
  return all.filter(
    (t) => t.owner && t.owner.toLowerCase() === session.email.toLowerCase()
  );
}

export async function createTicket(
  ticket: Omit<Ticket, "id">
): Promise<Ticket> {
  await new Promise((r) => setTimeout(r, 200));
  const tickets = readTickets();
  const session = getSession();
  if (!session) throw new Error("Not authenticated");

  const newTicket: Ticket = {
    ...ticket,
    id: Date.now().toString(),
    owner: session.email,
  };
  tickets.unshift(newTicket);
  writeTickets(tickets);
  return newTicket;
}

export async function updateTicket(
  id: string,
  patch: Partial<Ticket>
): Promise<Ticket> {
  await new Promise((r) => setTimeout(r, 200));
  const tickets = readTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  const session = getSession();
  if (!session) throw new Error("Not authenticated");
  // ensure the ticket belongs to the current user
  if (tickets[idx].owner?.toLowerCase() !== session.email.toLowerCase()) {
    throw new Error("Unauthorized");
  }

  const updated = { ...tickets[idx], ...patch } as Ticket;
  tickets[idx] = updated;
  writeTickets(tickets);
  return updated;
}

export async function deleteTicket(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 150));
  const session = getSession();
  if (!session) throw new Error("Not authenticated");

  const tickets = readTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  if (tickets[idx].owner?.toLowerCase() !== session.email.toLowerCase()) {
    throw new Error("Unauthorized");
  }

  const filtered = tickets.filter((t) => t.id !== id);
  writeTickets(filtered);
}
