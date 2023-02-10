import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {google,Auth} from 'googleapis';
import { NaverAuthGuard } from './naver.guard';
import { KakaoAuthGuard } from './kakao.guard';
import { GoogleAuthGuard } from './google.guard';
import axios from 'axios';


@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/google')
    // @UseGuards(GoogleAuthGuard)
    async googleAuth(@Body('credential') credential:string) {
        const data = await this.authService.getGooglePayload(credential);
        return {
            data,
            message: 'success',
        };

    }
  
    // @Get('/google/callback')
    // @UseGuards(GoogleAuthGuard)
    // googleAuthRedirect(@Req() req : any,@Res()res :any,@Session() session:any) {
    //     console.log("session",session)
    //   return req.user;

    // }

    @Post('/kakao')
    @UseGuards(KakaoAuthGuard)
    async kakaoAuth(@Body('access_token') access_token:string, @Session() session:any) {
        console.log(session, 'session');
        // return await this.authService.getKakaoPayload(access_token);
    }
  
    // @Get('/kakao/callback')
    // @UseGuards(KakaoAuthGuard)
    // kakaoAuthRedirect(@Req() req : any,@Session() session:any) {
    //     console.log("session",session)
    //   return req.user;
    // }

    @Post('/naver')
    @UseGuards(NaverAuthGuard)
    async naverAuth(@Body('access_token') access_token:string, @Session() session:any) {
        console.log(session, 'session');
        // const user = await this.authService.getNaverPayload(token);
        // return user;
    }
  
    // @Get('/naver/callback')
    // @UseGuards(NaverAuthGuard)
    // naverAuthRedirect(@Req() req : any,@Session() session:any) {
    //     console.log("session",session)
    //   return req.user;
    // }

    @Post('/logout')
    async logout(@Session() session:any){
        session.destroy();
        return {
            message: 'success',
        }
    }
}

