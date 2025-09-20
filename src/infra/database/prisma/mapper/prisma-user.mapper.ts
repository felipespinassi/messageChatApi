import { User } from "src/core/entities/user";

export class PrismaUserMapper {
  public static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
      company_id: user.companyId,
    };
  }

  public static toDomain(rawUser: any) {
    const user = new User();

    user.id = rawUser.id;
    user.name = rawUser.name;
    user.email = rawUser.email;
    user.password = rawUser.password;
    user.createdAt = rawUser.created_at;
    user.updatedAt = rawUser.updated_at;
    user.type = rawUser.type;
    user.companyId = rawUser.company_id;

    return user;
  }
}
