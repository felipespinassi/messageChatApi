import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
  id: true,
})
export class Message {
  @Prop({ type: String, default: uuidv4 })
  id: string;

  @Prop()
  content: string;

  @Prop()
  user_id: string;

  @Prop()
  conversation_id: string;

  @Prop()
  type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});
