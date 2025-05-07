import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Image {
  id: string;
  src: string;
  alt: string;
  author: string;
  url: string;
  category: string;
  createdAt: Date;
}

export function useImages(category: string) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(db, 'images'),
          where('category', '==', category),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const imageData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          let createdAt;
          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            createdAt = data.createdAt.toDate();
          } else if (typeof data.createdAt === 'string') {
            createdAt = new Date(data.createdAt);
          } else if (data.createdAt instanceof Date) {
            createdAt = data.createdAt;
          } else {
            createdAt = null;
          }
          return {
            id: doc.id,
            src: data.src,
            alt: data.alt,
            author: data.author,
            url: data.url,
            category: data.category,
            createdAt,
          };
        }) as Image[];

        setImages(imageData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('画像の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  return { images, loading, error };
} 