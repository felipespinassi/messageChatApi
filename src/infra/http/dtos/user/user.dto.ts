export class UserDto {
  id: number;
  email: string;
  name: string;

  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
