import { Product } from './../../entities/Products';
import { Field, InputType } from "type-graphql";
import { Length } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class ProductInput implements Partial<Product> {
    @Field()
    name: String;

    @Field()
    @Length(1, 255)
    description: String;

    @Field()
    color: String;

    @Field()
    stock: number;

    @Field()
    price: number;

    @Field(() => String)
    category_id: ObjectId;
}