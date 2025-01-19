export class ConversationUsersMessagesDto {
  id: string;

  isGroup: boolean;
  messages: [];
  users: [
    {
      id: number;
      name: string;
      email: string;
    }
  ];

  createdAt: Date;
  updatedAt: Date;
}
