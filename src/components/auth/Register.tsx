import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      setErr(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-primary">Create Account</h2>

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
          Register
        </button>

        <div className="flex justify-between text-sm">
          <Link to="/login" className="text-secondary">Login</Link>
        </div>
      </form>
    </div>
  );
}
