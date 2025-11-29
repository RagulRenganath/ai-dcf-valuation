import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent successfully!");
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <form
        className="card max-w-md w-full space-y-4"
        onSubmit={handleReset}
      >
        <h2 className="text-2xl font-bold text-primary">Reset Password</h2>

        {msg && <p className="text-sm text-highlight">{msg}</p>}

        <div>
          <label className="text-sm">Enter your email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="w-full py-2 bg-primary text-white rounded">
          Send Reset Link
        </button>

        <Link to="/login" className="text-secondary text-sm">
          Back to Login
        </Link>
      </form>
    </div>
  );
}
