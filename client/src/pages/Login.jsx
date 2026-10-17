import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      navigate("/library", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your details and try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome"
      accent="back"
      subtitle="Please sign in to continue"
      error={error}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel={submitting ? "Signing in..." : "Sign in"}
      footerText="Don't have an account?"
      footerTo="/register"
      footerLink="Create one"
    >
      <AuthField
        label="Email address"
        icon="mail"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        autoFocus
      />
      <AuthField
        label="Password"
        icon="lock"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
      />
    </AuthLayout>
  );
}
