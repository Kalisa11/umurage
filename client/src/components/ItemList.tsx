"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function ItemList() {
  const [items, setItems] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.getCategories();
        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setItems(response.data as any[]);
        }
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  console.log({ items });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Items</h2>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul className="space-y-2">
          {items.map((category) => (
            <li key={category.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
