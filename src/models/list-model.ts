import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IList extends Document {
  title: string;
  userID: string;
  description: string;
  listType: string;
}

const listSchema: Schema<IList> = new Schema(
  {
    title: String,
    userID: String,
    description: String,
    listType: String,
  },
  {
    timestamps: true,
  }
);

let List: Model<IList>;

try {
  List = mongoose.model<IList>('List');
} catch {
  List = mongoose.model<IList>('List', listSchema);
}

export default List;
