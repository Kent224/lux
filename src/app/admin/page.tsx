"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ImageUploader from "./uploader";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err: any) {
      setError("メールアドレスまたはパスワードが違います");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-sm bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {user ? (
          <>
            <div className="mb-4 text-center">ログイン済み: {user.email}</div>
            <ImageUploader />
            <button onClick={handleLogout} className="w-full bg-gray-200 py-2 rounded font-bold mt-4">ログアウト</button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button type="submit" className="bg-yellow-500 text-white font-bold py-2 rounded" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
} 