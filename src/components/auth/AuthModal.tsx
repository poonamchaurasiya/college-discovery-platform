"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { Mail, Lock, User } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, signup, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = mode === "login"
      ? await login(form.email, form.password)
      : await signup(form.name, form.email, form.password);
    if (result.success) {
      onClose();
      setForm({ name: "", email: "", password: "" });
    } else {
      setError(result.error ?? "Something went wrong");
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
    setError("");
  };

  return (
    <Modal open={open} onClose={onClose} title={mode === "login" ? "Welcome back" : "Create account"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <Input
            label="Full Name"
            placeholder="Arjun Sharma"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            leftIcon={<User size={16} />}
            required
          />
        )}
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          leftIcon={<Mail size={16} />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          leftIcon={<Lock size={16} />}
          required
          minLength={6}
        />
        {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {mode === "login" && (
          <p className="text-xs text-slate-400">Demo: <strong>demo@example.com</strong> / <strong>demo123</strong></p>
        )}
        <Button type="submit" className="w-full" loading={isLoading}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>
        <p className="text-center text-sm text-slate-500">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={toggleMode} className="text-blue-600 font-medium hover:underline">
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </form>
    </Modal>
  );
}
