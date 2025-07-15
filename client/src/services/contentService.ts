import { Proverb, Story } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/story/featured`);
    return response.data as Story[];
  } catch (error) {
    console.error("Error getting featured stories: ", error);
    throw error;
  }
};

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

export const addProverb = async (proverb: any) => {
  try {
    const response = await axios.post(`${API_URL}/content/proverb`, proverb, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding proverb: ", error);
    throw error;
  }
};

export const getProverbs = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/proverb`);
    return response.data as Proverb[];
  } catch (error) {
    console.error("Error getting proverbs: ", error);
    throw error;
  }
};