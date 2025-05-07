"use client";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, firestore } from "@/lib/firebase";

const categories = [
  { value: "food", label: "Food" },
  { value: "interiors", label: "Interiors" },
  { value: "social-media", label: "Social Media" },
  { value: "reel", label: "Reel" },
];

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(categories[0].value);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setUrl("");
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      console.log("アップロード開始:", file.name);
      const storageRef = ref(storage, `uploads/${category}/${Date.now()}_${file.name}`);
      
      console.log("Storageへのアップロード開始");
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("Storageアップロード完了:", uploadResult);
      
      console.log("ダウンロードURL取得開始");
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("ダウンロードURL取得完了:", downloadUrl);
      
      setUrl(downloadUrl);
      
      console.log("Firestoreへの保存開始");
      await addDoc(collection(firestore, "images"), {
        url: downloadUrl,
        category,
        createdAt: serverTimestamp(),
      });
      console.log("Firestoreへの保存完了");
      
      setSuccess("アップロード＆登録完了！");
    } catch (err: any) {
      console.error("アップロードエラー:", err);
      setError(`アップロードに失敗しました: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">画像アップロード</label>
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-yellow-500 file:text-white
            hover:file:bg-yellow-600
            cursor-pointer"
        />
      </div>
      <div className="mb-2">
        <label className="mr-2">カテゴリ:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-2 py-1">
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {uploading ? "アップロード中..." : "アップロード"}
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      {url && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-1">画像URL:</div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline break-all">{url}</a>
          <img src={url} alt="uploaded" className="mt-2 max-w-full h-auto rounded shadow" />
        </div>
      )}
    </div>
  );
} 