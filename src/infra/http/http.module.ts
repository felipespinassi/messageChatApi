import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "src/core/services/user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class HttpModule {}
