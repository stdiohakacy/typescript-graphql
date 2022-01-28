import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Product } from "./Products";
import { Ref } from "../types";

@ObjectType({ description: "The Order Model" })
export class Order {
    @Field(() => ID)
    id: string;

    @Field()
    @Property({ nullable: true })
    user_id: String;

    @Field()
    @Property({ required: true })
    payde: Boolean;

    @Field()
    @Property({ default: new Date(), required: true, nullable: true })
    date: Date;

    // @Field(_type => Product)
    @Property({ ref: Product, required: true })
    products: Ref<Product>;
    _doc: any;
}

export const OrderModel = getModelForClass(Order);
