import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({ error: "Invalid input: missing email, password, or role" });
      return;
    }

    if (role !== "CLIENT" && role !== "PHOTOGRAPHER") {
      res.status(400).json({ error: "Invalid input: role must be CLIENT or PHOTOGRAPHER" });
      return;
    }

    const { user, token } = await AuthService.registerUser({ email, password, role });
    res.status(201).json({ user, token });
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Registration failed." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Invalid input: missing email or password" });
      return;
    }

    const { user, token } = await AuthService.loginUser({ email, password });
    res.status(200).json({ user, token });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Login failed." });
  }
};
