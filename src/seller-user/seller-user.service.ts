import {  BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SellerUser } from './schemas/sellerUser.schemas';
import { Model } from 'mongoose';

@Injectable()
export class SellerUserService {
    constructor(@InjectModel(SellerUser.name) private userModel: Model<SellerUser> ) {}


    async create(name:string, phoneNumber:string, hashedPassword:string, email:string): Promise<SellerUser> {
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


    async findOne(phoneNumber: string):Promise<SellerUser> {
        const user = await this.userModel.findOne({phoneNumber});
        return user
    }

}
