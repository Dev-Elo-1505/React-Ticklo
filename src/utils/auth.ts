export interface SessionData {
  token: string;
  email: string;
}

const USERS_KEY = "mock_users";
const SESSION_KEY = "ticketapp_session";

function readUsers(): Array<{ email: string; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: Array<{ email: string; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(session: SessionData) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));

  const users = readUsers();
  const exists = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  users.push({ email, password });
  writeUsers(users);

  const token = Math.random().toString(36).slice(2);
  const session = { token, email };
  saveSession(session);


  try {
    window.dispatchEvent(new Event("ticketapp_auth_changed"));
  } catch {}

  return session;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await new Promise((r) => setTimeout(r, 250));

  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error("No account found for this email.");
  }
  if (user.password !== password) {
    throw new Error(
      "Invalid credentials. Please check your email and password."
    );
  }

  const token = Math.random().toString(36).slice(2);
  const session = { token, email };
  saveSession(session);
 
  try {
    window.dispatchEvent(new Event("ticketapp_auth_changed"));
  } catch {}
  return session;
}

export function logout() {
  clearSession();
  try {
    window.dispatchEvent(new Event("ticketapp_auth_changed"));
  } catch {}
}

export function getSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
