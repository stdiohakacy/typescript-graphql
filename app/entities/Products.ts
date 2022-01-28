import { Field, ID, Int, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Categories } from "./Categories";
import { Ref } from "../types";
import { ObjectId } from "mongoose";

@ObjectType({ description: 'The Product model' })
export class Product {
    @Field(() => ID)
    id: String;

    @Field()
    @Property()
    name: String;

    @Field()
    @Property()
    description: String;

    @Field()
    @Property()
    color: String;

    @Field((_type) => Int)
    @Property()
    stock: number;

    @Field((_type) => Int)
    @Property()
    price: number;

    @Field((_type) => String)
    @Property({ ref: Categories })
    category_id: Ref<Categories | ObjectId>;
    _doc: any;
}

export const ProductModel = getModelForClass(Product)