import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Message from "../components/Message";
import {
  sendResetCode,
  verifyResetCode,
  resetAdminPassword,
} from "../api/adminApi";

type Step = "enterEmail" | "enterCode" | "enterPassword" | "success";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("enterEmail");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [adminId, setAdminId] = useState("");
  const [passwords, setPasswords] = useState({
    newPass: "",
    verifiedPass: "",
  });

  const [message, setMessage] = useState<any>(null);

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    if (loadingEmail) return;

    setLoadingEmail(true);
    setMessage(null);

    try {
      const res = await sendResetCode(email);

      setAdminId(res.data.adminId);
      setStep("enterCode");
      setMessage({ type: "success", message: res.data.message });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.response?.data?.message || "Failed to send code",
      });
    } finally {
      setLoadingEmail(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (loadingCode) return;

    setLoadingCode(true);
    setMessage(null);

    try {
      const res = await verifyResetCode(code, adminId);
      setStep("enterPassword");
      setMessage({ type: "success", message: res.data.message });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.response?.data?.message || "Verification failed",
      });
    } finally {
      setLoadingCode(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (loadingReset) return;

    setLoadingReset(true);
    setMessage(null);

    try {
      const res = await resetAdminPassword(
        adminId,
        passwords.newPass,
        passwords.verifiedPass
      );

      setStep("success");
      setMessage({ type: "success", message: res.data.message });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.response?.data?.message || "Reset failed",
      });
    } finally {
      setLoadingReset(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 space-y-5">
        {message && Message(message.type, message.message)}

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Reset Password
        </h1>

        {step === "enterEmail" && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400"
            />

            <button
              disabled={loadingEmail}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 rounded-xl font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loadingEmail && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loadingEmail ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        {step === "enterCode" && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input
              required
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400"
            />

            <button
              disabled={loadingCode}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 rounded-xl font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loadingCode && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loadingCode ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {step === "enterPassword" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              required
              placeholder="New password"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, newPass: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400"
            />

            <input
              type="password"
              required
              placeholder="Confirm password"
              value={passwords.verifiedPass}
              onChange={(e) =>
                setPasswords((p) => ({
                  ...p,
                  verifiedPass: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400"
            />

            <button
              disabled={loadingReset}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 rounded-xl font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loadingReset && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="space-y-4 text-center">
            <div className="text-emerald-600 font-semibold">
              Password reset successful 🎉
            </div>

            <button
              onClick={() => navigate({ to: "/admin/login" })}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold transition"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}