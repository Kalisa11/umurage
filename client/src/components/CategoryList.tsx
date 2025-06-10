'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories();
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(category.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 