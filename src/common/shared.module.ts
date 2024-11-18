import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";
import { AuthGuard } from "./guards/authGuard";
import { UsersModule } from "src/users/users.module";
// import { RolesGuard } from "./guards/roleGuard";
import { MailService } from "./service/mail.service";
import { AuthsModule } from "src/auths/auths.module";
// import { UsersService } from "src/users/users.service";

@Global()
@Module({
    imports: [UsersModule,AuthsModule],
    providers: [ConfigService,AuthGuard,MailService],
    exports: [ConfigService,AuthGuard,MailService]
})
export class SharedModule{}