import { LoginSchema, SignupSchema } from "@/lib/validationSchema";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const signup = async (data: SignupSchema) => {
  try {
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });
    if (error) {
      throw error;
    }
    return userData;
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
