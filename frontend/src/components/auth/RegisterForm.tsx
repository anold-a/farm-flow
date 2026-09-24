"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();

  const { register } = useAuth();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) { 
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      await register({
        fullName,
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
      label="Full Name"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

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

      <Input
      label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
      />

      <label className="flex items-start gap-2 text-sm text-gray-600"> 
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
        />
        <span>
          I have read and accept the{" "}
          <Link href="/terms" className="text-emerald-600 underline-offset-2 hover:underline">
            terms and conditions
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-green-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}