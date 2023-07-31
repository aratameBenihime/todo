import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface ITask extends Document {
  task: string;
  listName: string;
  userID: string;
  marked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    task: String,
    marked: Boolean,
    listName: String,
    userID: String,
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> =
  (mongoose.models.Task as Model<ITask>) || model<ITask>("Task", taskSchema);

export default Task;
