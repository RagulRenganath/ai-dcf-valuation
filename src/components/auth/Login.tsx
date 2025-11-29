import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      setErr(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-primary">Sign In</h2>

        {err && <div className="text-red-500 text-sm">{err}</div>}

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full py-2 bg-primary text-white rounded">
          Login
        </button>

        <div className="flex justify-between text-sm">
          <Link to="/register" className="text-secondary">Create Account</Link>
          <Link to="/reset" className="text-highlight">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
