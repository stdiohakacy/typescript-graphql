import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The Categories model' })
export class Categories {
    @Field(() => ID)
    id: string;

    @Field()
    @Property()
    name: String;

    @Field()
    @Property()
    description: String;
}

export const CategoriesModel = getModelForClass(Categories);
