const chats = []
const CHAT_CHANNEL = 'CHAT_CHANNEL';

const resolver = {
    Query: {
        chats(room, args, context) {
            return chats;
        }
    },
    Mutation: {
        sendMessage(root, { from, message }, { pubsub }) {
            const chat = { id: chats.length + 1, from, message };
            chats.push(chat);
            pubsub.publish('CHAT_CHANNEL', { messageSent: chat });
            
            return chat;
        }
    },
    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(CHAT_CHANNEL);
            }
        }
    }
}

module.exports = resolver;