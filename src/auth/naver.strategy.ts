import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import axios from "axios";
import { AuthService } from "./auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver'){
    constructor(
        private readonly authService: AuthService,
    ){
        super({
            usernameField: 'access_token',
            passwordField: 'refresh_token',
        });
    }
    async validate(access_token: string, refresh_token, done: any){
        console.log(access_token, 'token')
        try{
            const user = await this.authService.getNaverPayload(access_token);
            return  done(null, user);
        }catch(err){
            console.log(err)
            return  done(null, false);
        }
    }
}