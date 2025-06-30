import axios from "axios";
import { Event } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data as Event[];
  } catch (error) {
    console.log("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching event by id :", error);
    throw error;
  }
};

export const createEvent = async (event: Event) => {
  try {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.log("Error creating event:", error);
    throw error;
  }
};
