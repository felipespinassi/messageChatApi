export class ConversationUserMessagesDto {
  id: string;
  isGroup: boolean;
  messages: [];
  user: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
