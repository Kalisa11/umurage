import {
  LoginSchema,
  ProfileSchema,
  ProfileSubmissionSchema,
  SignupSchema,
} from "@/lib/validationSchema";
import { User } from "@/types";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

const supabase = createClient();
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (data: SignupSchema) => {
  try {
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}`,
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });
    const dataToSend = {
      ...data,
      id: userData.user?.id,
    };
    const response = await axios.post(`${API_URL}/users`, dataToSend);
    if (error) {
      throw error;
    }
    return { userData, response };
  } catch (error) {
    console.log("signup error", error);
    throw error;
  }
};

export const login = async (data: LoginSchema) => {
  try {
    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw error;
    }
    return userData;
  } catch (error) {
    console.log("login error", error);
    throw error;
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut({
    scope: "global",
  });
  // refresh the page
  window.location.reload();
  if (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const id = session?.session?.user?.id;
    if (!id) {
      throw new Error("User not authenticated");
    }
    const response = await axios.get(`${API_URL}/auth/profile/${id}`);
    return response.data.user as User;
  } catch (error) {
    console.log("getCurrentUser error", error);
    throw error;
  }
};

export const updateUser = async (data: ProfileSchema) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const id = session?.session?.user?.id;
    if (!id) {
      throw new Error("User not authenticated");
    }

    // Prepare the data to send to the API
    const apiData: ProfileSubmissionSchema = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      region: data.region,
      bio: data.bio,
    };

    // Only handle avatar upload if a new file is provided
    if (data.avatar) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("umurage")
        .upload(`avatars/${id}`, data.avatar, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) {
        throw uploadError;
      }
      const { data: urlData, error: urlError } = await supabase.storage
        .from("umurage")
        .createSignedUrl(`avatars/${id}`, 3600 * 24 * 365);
      if (urlError) {
        console.error("Error creating signed URL: ", urlError);
        throw urlError;
      }
      apiData.avatar = urlData.signedUrl;
    }
    // If no avatar is provided, don't include it in the API call to preserve existing avatar

    const response = await axios.put(`${API_URL}/auth/profile/${id}`, apiData);
    return response.data;
  } catch (error) {
    console.log("updateUser error", error);
    throw error;
  }
};
