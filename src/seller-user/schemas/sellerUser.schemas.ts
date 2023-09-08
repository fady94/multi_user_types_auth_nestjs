import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/schemas/user.schemas";




@Schema({
    timestamps:true,
    collection:"seller_users"
})

export class SellerUser extends User
{

    @Prop({default:false})
    verified:boolean

    @Prop()
    categoriesAllowed:string[]
} 

export const SellerUserSchema = SchemaFactory.createForClass(SellerUser)