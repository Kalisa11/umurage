import { Art, ContributorContentResponse, Music, Proverb, Story } from "@/types";
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

export const getArtById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/art/${id}`);
    return response.data as Art;
  } catch (error) {
    console.error("Error getting art by id: ", error);
    throw error;
  }
};

export const addMusic = async (music: any) => {
  try {
    const coverImage = music.coverImage as File;
    const audioFile = music.audioFile as File;
    let coverImageUrl = null;
    let audioFileUrl = null;

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

    if (audioFile) {
      const { error: uploadError } = await supabase.storage
        .from("umurage")
        .upload(`content/${audioFile.name}`, audioFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading audio file: ", uploadError);
        throw uploadError;
      }

      const { data: urlData, error: urlError } = await supabase.storage
        .from("umurage")
        .createSignedUrl(`content/${audioFile.name}`, 3600 * 24 * 365); // valid for 1 year

      if (urlError) {
        console.error("Error creating signed URL: ", urlError);
        throw urlError;
      }

      audioFileUrl = urlData.signedUrl;
    }

    const musicData = {
      ...music,
      coverImage: coverImageUrl,
      audioUrl: audioFileUrl,
    };

    const response = await axios.post(`${API_URL}/content/music`, musicData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding music: ", error);
    throw error;
  }
};

export const getMusic = async () => {
  try {
    const response = await axios.get(`${API_URL}/content/music`);
    return response.data as Music[];
  } catch (error) {
    console.error("Error getting music: ", error);
    throw error;
  }
};

export const getMusicById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/music/${id}`);
    return response.data as Music;
  } catch (error) {
    console.error("Error getting music by id: ", error);
    throw error;
  }
};

export const getContributorContent = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/contributor/${id}`);
    return response.data as ContributorContentResponse;
  } catch (error) {
    console.error("Error getting contributor content: ", error);
    throw error;
  }
};
