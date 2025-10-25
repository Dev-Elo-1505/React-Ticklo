import * as z from "zod";


export const authSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthForm = z.infer<typeof authSchema>;

export type ButtonType = "button" | "submit" | "reset";

export interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Session {
  token: string;
  user: string;
}

export const ticketSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"]),
});

export type Ticket = z.infer<typeof ticketSchema>;