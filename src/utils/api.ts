import type { Session } from "../types";

export const authenticateUser = async (email: string, password: string) => {
    if (email === 'user@test.com' && password === 'pass') {
    const session: Session = { token: 'fake-token', user: email };
    localStorage.setItem('ticketapp_session', JSON.stringify(session));
    return session;
  }
  return null;
}