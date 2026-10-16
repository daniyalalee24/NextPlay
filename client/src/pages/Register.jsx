import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";

const empty = { name: "", email: "", password: "" };

export default function Register() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setSuccess(
        data?.message ||
          "Your account has been created successfully. You can now log in.",
      );
      setForm(empty);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your"
      accent="account"
      subtitle="Build your game library and find something new to play."
      error={error}
      notice={
        success && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-300"
          >
            <p className="font-semibold">Account created</p>
            <p className="mt-1">{success}</p>
            <Link
              to="/login"
              className="mt-3 inline-block font-semibold underline underline-offset-4 hover:text-emerald-200"
            >
              Continue to login →
            </Link>
          </div>
        )
      }
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel={submitting ? "Creating account..." : "Create account"}
      footerText="Already have an account?"
      footerTo="/login"
      footerLink="Log in"
    >
      <AuthField
        label="Full name"
        icon="user"
        name="name"
        autoComplete="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        autoFocus
      />
      <AuthField
        label="Email address"
        icon="mail"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
      />
      <AuthField
        label="Password"
        icon="lock"
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="Create a password"
        hint="Create a unique password."
        value={form.password}
        onChange={handleChange}
      />
    </AuthLayout>
  );
}
