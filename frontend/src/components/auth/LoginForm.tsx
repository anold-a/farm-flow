"use client";

import { useState } from "react";

import Link from "next/link";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");
    const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
    <form
      onSubmit={handleSubmit}
      className="space-y-3.5"
    >
      <Input
      label="Email Address"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <Input
      label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer select-none font-medium text-gray-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Remember me
          </label>
          
          <Link 
            href="coming soon" 
            className="font-medium text-gray-500 hover:text-emerald-600 transition"
          >
            Forgot your password? <span className="text-emerald-500 hover:underline">Reset</span>
          </Link>
        </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </Button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-emerald-500 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
    </div>
  );
}