"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import ImageUploader from "./uploader";
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Image from 'next/image';

interface ImageData {
  id: string;
  url: string;
  category: string;
  alt: string;
  author: string;
  creditUrl: string;
  createdAt: string;
  storagePath?: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editAuthor, setEditAuthor] = useState("");

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

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const imageList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // デバッグ用にurlとcreatedAtを出力
        console.log('Firestore image data:', data);
        let createdAt;
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          createdAt = data.createdAt.toDate();
        } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
          createdAt = new Date(data.createdAt);
        } else {
          createdAt = null;
        }
        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      }) as ImageData[];
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (image: ImageData) => {
    if (!confirm('この画像を削除してもよろしいですか？')) return;

    try {
      if (!image.storagePath) {
        alert('storagePathが存在しないため、Storageから削除できません。');
      } else {
        // Storageから画像を削除
        const imageRef = ref(storage, image.storagePath);
        await deleteObject(imageRef);
      }
      // Firestoreからドキュメントを削除
      await deleteDoc(doc(db, 'images', image.id));
      // ローカルの状態を更新
      setImages(images.filter(img => img.id !== image.id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('画像の削除中にエラーが発生しました。');
    }
  };

  const handleEdit = (image: ImageData) => {
    setEditId(image.id);
    setEditAuthor(image.author);
  };

  const handleEditSave = async (image: ImageData) => {
    try {
      await updateDoc(doc(db, 'images', image.id), { author: editAuthor });
      setImages(images.map(img => img.id === image.id ? { ...img, author: editAuthor } : img));
      setEditId(null);
    } catch (error) {
      alert('編集に失敗しました');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-sm bg-white rounded shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Admin Login</h1>
        {user ? (
          <>
            <div className="mb-4 text-center text-gray-900 font-bold">ログイン済み: {user.email}</div>
            <ImageUploader />
            <button onClick={handleLogout} className="w-full bg-gray-400 hover:bg-gray-600 py-2 rounded font-bold mt-4 text-gray-900 transition-colors">ログアウト</button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border px-3 py-2 rounded text-gray-900"
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border px-3 py-2 rounded text-gray-900"
              required
            />
            {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}
            <button type="submit" className="bg-yellow-500 text-white font-bold py-2 rounded" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        )}
      </div>
      {user && (
        <div className="container mx-auto px-4 py-8 mt-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">画像管理</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg p-4 shadow-sm">
                <div className="relative aspect-video mb-4 flex flex-col items-center justify-center">
                  {image.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || '画像'}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded">
                      <span className="text-black font-bold text-xl text-center">画像なし</span>
                      <span className="text-xs text-gray-500 break-all">ID: {image.id}</span>
                      <span className="text-xs text-gray-500 break-all">URL: {image.url}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-gray-900 font-bold">
                  <p><strong>カテゴリ:</strong> {image.category}</p>
                  {editId === image.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={editAuthor}
                        onChange={e => setEditAuthor(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-900 font-bold"
                      />
                      <button onClick={() => handleEditSave(image)} className="bg-blue-500 text-white px-2 py-1 rounded font-bold">保存</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-300 text-gray-900 px-2 py-1 rounded font-bold">キャンセル</button>
                    </div>
                  ) : (
                    <p><strong>作者:</strong> {image.author} <button onClick={() => handleEdit(image)} className="ml-2 text-blue-600 underline text-xs font-normal">編集</button></p>
                  )}
                  <p><strong>作成日:</strong> {image.createdAt ? new Date(image.createdAt).toLocaleDateString() : '不明'}</p>
                  <button
                    onClick={() => handleDelete(image)}
                    className="w-full bg-gray-400 hover:bg-gray-600 text-gray-900 py-3 rounded transition-colors font-bold mt-4 mb-2 text-lg"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
} 