import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { SellerUserModule } from 'src/seller-user/seller-user.module';
import { AuthService } from './auth.service';
import { BuyerUserModule } from 'src/buyer-user/buyer-user.module';

@Module({
  imports: [
    SellerUserModule,
    BuyerUserModule,
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config : ConfigService) =>{
        return {
          global: true,
          secret : config.get<string>('JWT_SECRET'),
          signOptions : {
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
          }
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports:[PassportModule]
})
export class AuthModule {}
