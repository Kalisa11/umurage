import axios from "axios";
import { Submission } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllApprovedSubmissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/submissions`);
    return response.data as Submission[];
  } catch (error) {
    console.log("Error fetching approved submissions:", error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/submissions/${id}`);
    return response.data as Submission;
  } catch (error) {
    console.log("Error fetching submission by id:", id, error);
    throw error;
  }
};

export const getSubmissionsByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/submissions/category/${categoryId}`
    );
    return response.data as Submission[];
  } catch (error) {
    console.log("Error fetching submissions by category:", categoryId, error);
    throw error;
  }
};
