import axios from "axios";
import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data as Category;
  } catch (error) {
    console.error("Error fetching category by id:", id, error);
    throw error;
  }
};
