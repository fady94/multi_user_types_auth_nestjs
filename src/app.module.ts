import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SellerUserModule } from './seller-user/seller-user.module';
import { BuyerUserModule } from './buyer-user/buyer-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }    ),
    MongooseModule.forRoot(process.env.DB_URI),
    SellerUserModule,
    AuthModule,
    BuyerUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
