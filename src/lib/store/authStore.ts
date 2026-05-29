"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "demo@example.com": {
    password: "demo123",
    user: { id: "u1", name: "Demo User", email: "demo@example.com", avatar: "DU" },
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const record = MOCK_USERS[email.toLowerCase()];
        if (record && record.password === password) {
          set({ user: record.user, isLoading: false });
          return { success: true };
        }
        set({ isLoading: false });
        return { success: false, error: "Invalid email or password" };
      },
      signup: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        if (MOCK_USERS[email.toLowerCase()]) {
          set({ isLoading: false });
          return { success: false, error: "Email already registered" };
        }
        const user: User = { id: `u_${Date.now()}`, name, email, avatar: name.slice(0, 2).toUpperCase() };
        MOCK_USERS[email.toLowerCase()] = { password, user };
        set({ user, isLoading: false });
        return { success: true };
      },
      logout: () => set({ user: null }),
    }),
    { name: "auth-store", partialize: (s) => ({ user: s.user }) }
  )
);
