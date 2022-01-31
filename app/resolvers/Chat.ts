import { Arg, Mutation, Resolver, Subscription, PubSub, PubSubEngine, Query, Root } from "type-graphql";
import { Chat } from './../entities/Chat';

const chats: Chat[] = [];
const channel = "CHAT_CHANNEL";

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(_returns => Boolean)
  async createChat(
    @PubSub() pubSub: PubSubEngine,
    @Arg("name") name: string,
    @Arg("message") message: string
  ): Promise<boolean> {
    const chat = { id: String(chats.length + 1), name, message };
    chats.push(chat);
    await pubSub.publish(channel, chat)
    return true;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() { id, name, message }: Chat): Chat {
    return { id, name, message };
  }
}