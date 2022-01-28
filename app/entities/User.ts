import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Cart } from "./Cart";
import { Ref } from "../types";

@ObjectType({ description: 'The User model' })
export class User {
    [x: string]: any;
    @Field(() => ID)
    id: number;

    @Field()
    @Property({ required: true })
    username: String;

    @Field()
    @Property({ required: true })
    email: String;

    @Field((_type) => String)
    @Property({ ref: Cart, required: true })
    cart_id: Ref<Cart>;
}

export const UserModel = getModelForClass(User);
