import { db } from "../db";
import { eq } from "drizzle-orm";
import { events } from "../db/schema";
import type { Request, Response } from "express";

const EventController = {
  async getAllEvents(req: Request, res: Response) {
    try {
      const eventsData = await db.select().from(events);
      return res.status(200).json(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      return res
        .status(500)
        .json({ message: "Error fetching events, " + error });
    }
  },

  async getEventById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const event = await db.select().from(events).where(eq(events.id, id));
      return res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      return res
        .status(500)
        .json({ message: "Error fetching event, " + error });
    }
  },

  async createEvent(req: Request, res: Response) {
    const { title, description, eventDate, location, imageUrl } = req.body;
    try {
      const event = await db
        .insert(events)
        .values({ title, description, eventDate, location, imageUrl });
      return res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      return res
        .status(500)
        .json({ message: "Error creating event, " + error });
    }
  },
};

export default EventController;
