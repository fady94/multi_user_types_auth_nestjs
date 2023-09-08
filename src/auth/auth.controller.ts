import { Body, Controller, Inject, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserType } from './user-types';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    
    constructor(@Inject(AuthService) private authService:AuthService){}


    /** Seller APIs **/

    @Post('seller/register')
    registerSeller(@Body() registerDto:RegisterDTO): Promise<{token : string}>{
        return this.authService.register(registerDto, UserType.Seller)
    }


    @Post('/seller/login')
    loginSeller(@Body() loginDto:LoginDTO): Promise<{token : string}>{
        return this.authService.login(loginDto, UserType.Seller)
    }

     /** Buyer APIs **/

     @Post('buyer/register')
     registerBuyer(@Body() registerDto:RegisterDTO): Promise<{token : string}>{
         return this.authService.register(registerDto, UserType.Buyer)
     }
 
 
     @Post('/buyer/login')
     loginBuyer(@Body() loginDto:LoginDTO): Promise<{token : string}>{
         return this.authService.login(loginDto, UserType.Buyer)
     }

}
