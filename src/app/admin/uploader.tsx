"use client";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";

const categories = [
  { value: "food", label: "Food" },
  { value: "interiors", label: "Interiors" },
  { value: "landscape", label: "Landscape" },
  { value: "portraits", label: "Portraits" },
];

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("ファイルを選択してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Storageに画像をアップロード
      const storagePath = `uploads/${file.name}`;
      const storageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Firestoreにメタデータを保存
      await addDoc(collection(db, "images"), {
        url: downloadURL,
        storagePath,
        category,
        author,
        createdAt: new Date().toISOString()
      });

      // フォームをリセット
      setFile(null);
      setCategory("");
      setAuthor("");
      alert("画像のアップロードが完了しました");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("画像のアップロード中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-bold mb-1 text-gray-900">画像ファイル</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border rounded p-2 text-gray-900 font-bold placeholder-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-900">カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2 text-gray-900 font-bold placeholder-gray-700"
          required
        >
          <option value="">選択してください</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-gray-900">作者</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded p-2 text-gray-900 font-bold placeholder-gray-700"
          required
          placeholder="例: 山田太郎"
        />
      </div>

      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition-colors disabled:bg-yellow-300 mt-4 mb-2 text-lg"
      >
        {loading ? "アップロード中..." : "アップロード"}
      </button>
    </form>
  );
} 