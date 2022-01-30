import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The Chat model' })
export class Chat {
    @Field(() => ID)
    id: string;

    @Field()
    @Property()
    message: string;

    @Field()
    @Property()
    name: string;
}

export const ChatModel = getModelForClass(Chat);
