"use client";

export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <div className="text-gray-500 mb-4">
        お問い合わせは、以下のInstagramアカウントへDMでご連絡ください。
      </div>
      <a
        href="https://www.instagram.com/kentaro.w.jp/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 underline text-lg font-bold hover:text-blue-800"
      >
        @kentaro.w.jp
      </a>
    </main>
  );
} 