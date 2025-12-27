import { db } from "./db";
import {
  feedback,
  type InsertFeedback,
  type Feedback
} from "@shared/schema";

export interface IStorage {
  createFeedback(item: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  async createFeedback(item: InsertFeedback): Promise<Feedback> {
    const [newItem] = await db.insert(feedback).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
