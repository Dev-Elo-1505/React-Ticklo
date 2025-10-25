import type { Ticket } from "../types";

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
  return readTickets();
}

export async function createTicket(ticket: Omit<Ticket, "id">): Promise<Ticket> {
  await new Promise((r) => setTimeout(r, 200));
  const tickets = readTickets();
  const newTicket: Ticket = {
    ...ticket,
    id: Date.now().toString(),
  };
  tickets.unshift(newTicket);
  writeTickets(tickets);
  return newTicket;
}

export async function updateTicket(id: string, patch: Partial<Ticket>): Promise<Ticket> {
  await new Promise((r) => setTimeout(r, 200));
  const tickets = readTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  const updated = { ...tickets[idx], ...patch } as Ticket;
  tickets[idx] = updated;
  writeTickets(tickets);
  return updated;
}

export async function deleteTicket(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 150));
  const tickets = readTickets().filter((t) => t.id !== id);
  writeTickets(tickets);
}
