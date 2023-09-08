import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/schemas/user.schemas";




@Schema({
    timestamps:true,
    collection:"buyer_users"
})

export class BuyerUser extends User
{

    @Prop({default:false})
    verified:boolean

    @Prop()
    preferredCategories:string[]
} 

export const BuyerUserSchema = SchemaFactory.createForClass(BuyerUser)