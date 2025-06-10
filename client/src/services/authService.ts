import { LoginSchema, SignupSchema } from "@/lib/validationSchema";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (data: SignupSchema) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (data: LoginSchema) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
