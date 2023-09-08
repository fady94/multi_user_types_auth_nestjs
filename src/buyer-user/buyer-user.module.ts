import { Module } from '@nestjs/common';
import { BuyerUserController } from './buyer-user.controller';
import { BuyerUserService } from './buyer-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerUser, BuyerUserSchema } from './schemas/buyerUser.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{name:BuyerUser.name , schema: BuyerUserSchema}]),
  ],
  controllers: [BuyerUserController],
  providers: [BuyerUserService],
  exports:[BuyerUserService]
})
export class BuyerUserModule {

}
