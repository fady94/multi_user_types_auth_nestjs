import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { SellerUserService } from 'src/seller-user/seller-user.service';
import { BuyerUserService } from 'src/buyer-user/buyer-user.service';
import { UserType } from './user-types';


@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService, @Inject(SellerUserService) private sellerUserService:SellerUserService, @Inject(BuyerUserService) private buyerUserService:BuyerUserService ) {}

    async register(registerDto : RegisterDTO, userType: UserType): Promise<{ token:string }> {
        const {name, phoneNumber, password, email} = registerDto
        const hashedPassword = await bcrypt.hash(password, 10);
        var user = undefined;
        if(userType == UserType.Seller){
          user = await this.sellerUserService.create(name,phoneNumber,hashedPassword,email)
        }else{
          user = await this.buyerUserService.create(name,phoneNumber,hashedPassword,email)
        }
        const token =  this.jwtService.sign({id: user._id})
        return {token}
    }

    async login(loginDto: LoginDTO, userType: UserType):Promise<{ token:string }> {
        const {phoneNumber, password} = loginDto
        var user = undefined;
        if(userType == UserType.Seller){
          user = await this.sellerUserService.findOne(phoneNumber);
        }else{
          user = await this.buyerUserService.findOne(phoneNumber);
        }

        if(!user){
            throw new UnauthorizedException("Invalid username or password")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid username or password")
        }

        const token =  this.jwtService.sign({id: user._id, type:userType})
        return {token}
    }

}
