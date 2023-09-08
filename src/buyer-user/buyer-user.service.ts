import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BuyerUser } from './schemas/buyerUser.schemas';
import { Model } from 'mongoose';

@Injectable()
export class BuyerUserService {
    constructor(@InjectModel(BuyerUser.name) private userModel: Model<BuyerUser> ) {}


    async create(name:string, phoneNumber:string, hashedPassword:string, email:string): Promise<BuyerUser> {
        const existed  = await this.userModel.findOne({$or: [{phoneNumber:phoneNumber},{ email : {'$exists': true , '$eq': email}}]});
        if(existed){
            throw new BadRequestException("User already existed")
        }
        const user = await this.userModel.create({
            name,
            phoneNumber,
            password:hashedPassword,
            email:email
        })
        return user;
    }


    async findOne(phoneNumber: string):Promise<BuyerUser> {
        const user = await this.userModel.findOne({phoneNumber});
        return user
    }
}
