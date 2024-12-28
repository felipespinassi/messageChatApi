import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "src/core/services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "src/core/services/auth.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  exports: [],
})
export class HttpModule {}
