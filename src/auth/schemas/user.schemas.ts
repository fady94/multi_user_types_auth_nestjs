import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";




@Schema({
    timestamps:true
})

export class User extends Document{

    @Prop({ required:true})
    name:string

    @Prop({unique: [true, 'Phone Number is already existed'] , required:[true, 'Phone number is required'], index:[true]})
    phoneNumber:string

    @Prop({required:true})
    password:string

    @Prop({lowercase:true, unique:true, sparse:true})
    email:string


} 