import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User extends Document {
	@Prop()
	mail: string;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

