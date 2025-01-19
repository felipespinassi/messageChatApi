export class ConversationUserMessageDto {
  id: string;
  isGroup: boolean;
  message: {};
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
