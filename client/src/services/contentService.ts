import { Story } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addStory = async (story: Story) => {
  try {
    const response = await axios.post(`${API_URL}/content/story`, story, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding story: ", error);
    throw error;
  }
};

export const getStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/story`);
    return response.data as Story[];
  } catch (error) {
    console.error("Error getting stories: ", error);
    throw error;
  }
};

export const getStoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/story/${id}`);
    return response.data as Story;
  } catch (error) {
    console.error("Error getting story by id: ", error);
    throw error;
  }
};
