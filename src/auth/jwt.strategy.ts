import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SellerUserService } from "src/seller-user/seller-user.service";

@Injectable()
export class JwtStrategy extends 
PassportStrategy(Strategy) {
    constructor( @Inject(SellerUserService) private sellerUserService:SellerUserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET,
        });
    }

    async validate(payload){
           const { id, type } = payload;
            var user = undefined ;
           if(type == "seller"){
            // find user in seller users table
             user = await this.sellerUserService.findOne(id);
           }else{
            // find user in buyer users table
           }

           if(!user){
            throw new UnauthorizedException("Please Login First")
           }

          return user; 
    } 
}