import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the document interface
interface InventionDocument extends Document {
  invention: string;
  inventor: string;
  year: number;
  description: string;
  imageUrl: string;
  public_id: string;
}

// Define the schema
const inventionSchema = new Schema<InventionDocument>({
  invention: { type: String, required: true },
  inventor: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  public_id: { type: String, required: true },
});

// Check if the model already exists before defining it
const Invention: Model<InventionDocument> = mongoose.models.Invention || mongoose.model<InventionDocument>('Invention', inventionSchema);

export { Invention };
