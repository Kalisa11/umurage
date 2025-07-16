import { Art, Proverb, Story } from "@/types";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const supabase = createClient();

export const getFeaturedStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/story/featured`);
    return response.data as Story[];
  } catch (error) {
    console.error("Error getting featured stories: ", error);
    throw error;
  }
};

export const addStory = async (story: any) => {
  try {
    const coverImage = story.coverImage as File;
    let coverImageUrl = null;

    if (coverImage) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("umurage")
        .upload(`content/${coverImage.name}`, coverImage, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) {
        console.error("Error uploading image: ", uploadError);
        throw uploadError;
      }

      const { data: urlData, error: urlError } = await supabase.storage
        .from("umurage")
        .createSignedUrl(`content/${coverImage.name}`, 3600 * 24 * 365); // valid for 1 year

      if (urlError) {
        console.error("Error creating signed URL: ", urlError);
        throw urlError;
      }

      coverImageUrl = urlData.signedUrl;
    }

    const response = await axios.post(
      `${API_URL}/content/story`,
      {
        ...story,
        coverImage: coverImageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const getProverbById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/proverb/${id}`);
    return response.data as Proverb;
  } catch (error) {
    console.error("Error getting proverb by id: ", error);
    throw error;
  }
};

export const addArt = async (art: any) => {
  try {
    const coverImage = art.coverImage as File;
    let coverImageUrl = null;

    if (coverImage) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("umurage")
        .upload(`content/${coverImage.name}`, coverImage, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading image: ", uploadError);
        throw uploadError;
      }

      const { data: urlData, error: urlError } = await supabase.storage
        .from("umurage")
        .createSignedUrl(`content/${coverImage.name}`, 3600 * 24 * 365); // valid for 1 year

      if (urlError) {
        console.error("Error creating signed URL: ", urlError);
        throw urlError;
      }

      coverImageUrl = urlData.signedUrl;
    }

    const response = await axios.post(
      `${API_URL}/content/art`,
      {
        ...art,
        coverImage: coverImageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding art: ", error);
    throw error;
  }
};

export const getArt = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/art`);
    return response.data as Art[];
  } catch (error) {
    console.error("Error getting art: ", error);
    throw error;
  }
};
