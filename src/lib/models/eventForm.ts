import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
    title: string;
    description: string;
    link: string;
}

interface IEventData extends Document {
    events: IEvent[];
    backgroundImage: string;
}

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
});

const eventDataSchema = new Schema<IEventData>({
    events: [eventSchema],
    backgroundImage: { type: String, required: true },
});

const EventData =  mongoose.models.EventData || mongoose.model<IEventData>('EventData', eventDataSchema);

export {EventData}
