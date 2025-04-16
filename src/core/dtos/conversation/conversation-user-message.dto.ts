export class ConversationUserMessageDto {
  id: string;
  isGroup: boolean;
  message: {};
  users: {
    id: number;
    name: string;
    email: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
}
