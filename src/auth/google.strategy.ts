import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { google } from 'googleapis';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super(
      {
      clientID: process.env.OAUTH_ID,
      clientSecret: process.env.OAUTH_PW,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      host: 'https://accounts.google.com',
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      // passReqToCallback: true,
      scope: ['email', 'profile'],
    }
    );
  }

  async validate(
    credential:string,
    refreshToken: any,
    profile: Profile,
  ){
    const { id, name, emails,photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      name: name!.givenName,
      email: emails![0].value,
      picture: photos![0].value,
    };
    return user;
  }
}