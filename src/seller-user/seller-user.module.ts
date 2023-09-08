import { Module} from '@nestjs/common';
import { SellerUserController } from './seller-user.controller';
import { SellerUserService } from './seller-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerUser, SellerUserSchema } from './schemas/sellerUser.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{name:SellerUser.name , schema: SellerUserSchema}]),
  ],
  controllers: [SellerUserController],
  providers: [SellerUserService],
  exports:[SellerUserService]
})
export class SellerUserModule {}
