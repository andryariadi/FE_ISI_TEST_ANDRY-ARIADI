import { z } from "zod";

export const SingupFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  role: z.enum(["lead", "team"]),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters").max(50, "Job title must be at most 50 characters"),
});

export const LoginFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
