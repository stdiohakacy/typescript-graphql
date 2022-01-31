import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The Chat model' })
export class Chat {
    @Field(() => ID)
    id: string;

    @Field()
    @Property()
    message: String;

    @Field()
    @Property()
    name: String;
}

export const ChatModel = getModelForClass(Chat);
