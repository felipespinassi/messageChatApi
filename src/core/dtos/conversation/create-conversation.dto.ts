export class CreateConversationDto {
  //conversation with users
  isGroup: boolean;
  users: number[];
  name?: string;
}
