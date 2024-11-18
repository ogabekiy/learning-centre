import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { UsersService } from "src/users/users.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new BadRequestException('Authorization header not provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new BadRequestException('Token not provided');
        }

        try {
            const decoded = jwt.verify(token, this.configService.get('JWT_ACCESS_TOKEN'));
            const user = await this.userService.findOneByEmail(decoded.email);
            
            if (!user) {
                throw new BadRequestException('User not found');
            }
            
            request.user = user;
            return true;
        } catch (error) {
            throw new BadRequestException('Invalid or expired token');
        }
    }
}
