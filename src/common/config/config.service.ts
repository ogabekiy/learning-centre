import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class ConfigService{
    get (name:any): string | undefined {
        return process.env[name]
    }
}
const configService = new ConfigService()
console.log(configService.get('JWT_ACCESS_TOKEN'))