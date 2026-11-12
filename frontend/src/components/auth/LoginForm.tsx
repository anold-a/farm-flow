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
    const [showPassword, setShowPassword] = useState(false);

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

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white py-3 pl-5 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";

  return (
    <div className="w-full space-y-4">
    <form
      onSubmit={handleSubmit}
      className="space-y-3.5"
    >
      <div>
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 14.5-4 16 0" />
            </svg>
          </span>
       <Input
      label="Email Address"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className={inputClass}
      />
      </div>

      <div className="relative">
        
 <Input
      label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className={`${inputClass} pr-10`}
      />
     
      </div>
     

     

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
            href="#" 
            className="font-medium text-gray-500 hover:text-emerald-600 transition"
          >
            Forgot password? <span className="text-emerald-500 hover:underline">Reset</span>
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
        className="flex w-full items-center justify-between rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
      >
        {loading
          ? "Signing In..."
          : "Login"}
           {!loading && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
      </Button>
      <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="h-px flex-1 bg-gray-200" />
          or
          <span className="h-px flex-1 bg-gray-200" />
        </div>

       
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 opacity-60"
        >
          Continue with Google (soon)
        </button>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 opacity-60"
        >
          Continue with Email OTP (soon)
        </button>

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