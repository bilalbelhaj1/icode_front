import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Message from "../components/Message";
import { login } from "../api/adminApi";
import type { MessageType } from "../types/types";
import { Loader2 } from "lucide-react"; // spinner icon

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<MessageType | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await login(form.email, form.password);
      setMessage({
        type: "success",
        message: "Login successful",
      });
      console.log(res.data)
      setTimeout(() => {
        navigate({ to: "/dashboard/members" });
      }, 500);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || "Invalid credentials";
      setMessage({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 space-y-5">
        {message && Message(message.type, message.message)}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm">Enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-2">
              <Link
                to="/admin/reset-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}