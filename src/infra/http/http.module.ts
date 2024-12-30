import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "src/core/services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "src/core/services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [],
})
export class HttpModule {}
