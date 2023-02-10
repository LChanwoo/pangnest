import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const googleclient = new OAuth2Client(
  process.env.OAUTH_ID,
  process.env.OAUTH_PW,
 );

@Injectable()
export class AuthService {

  constructor() {}

  async getGooglePayload(credential:string) {
    try{
      const ticket = await googleclient.verifyIdToken({
        idToken: credential,
        audience: process.env.OAUTH_ID,
      });
      console.log(ticket.getPayload(), 'ticket');
      const { email, name, picture } = ticket.getPayload();
      const data = {
        email,
        name,
        image: picture
      }
      return data;
    }catch(err){
      console.log(err)
    }
  }

  async getKakaoPayload(access_token:string) {
    try{
      const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(user.data, 'user');
      return user.data;
    }catch(err){
      console.log(err)
    }
  }

  async getNaverPayload(access_token:string) {
    try{
      const user = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(user.data, 'user');
      return user.data;
    }catch(err){
      console.log(err)
    }
  }
}
