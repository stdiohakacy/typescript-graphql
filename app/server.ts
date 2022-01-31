import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from "dotenv"
import Express from 'express'
import { execute, subscribe } from 'graphql'
import { createServer } from "http"
import { connect } from "mongoose"
import "reflect-metadata"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { buildSchema } from "type-graphql"
import { CartResolver } from "./resolvers/Cart"
import { CategoriesResolver } from "./resolvers/Categories"
import { ChatResolver } from "./resolvers/Chat"
import { OrderResolver } from "./resolvers/Order"
import { ProductResolver } from "./resolvers/Product"
import { UserResolver } from "./resolvers/User"

dotenv.config();

const main = async () => {
    const app = Express();
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    const schema = await buildSchema({
        resolvers: [
            CategoriesResolver,
            ProductResolver,
            UserResolver,
            CartResolver,
            OrderResolver,
            ChatResolver,
        ],
        emitSchemaFile: true,
        validate: false,
    })

    // create mongoose connection
    const mongoose = await connect(String(process.env.MONGODB_URI_LOCAL));
    await mongoose.connection;
    
    const apolloServer = new ApolloServer({
        schema,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }, ApolloServerPluginLandingPageGraphQLPlayground],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const httpServer = createServer(app);

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe}, 
        { server: httpServer, path: '/subscriptions', }
    );

    httpServer.listen(process.env.PORT, () => {
        subscriptionServer
        console.log(`Server ready and listening at http://localhost:4000${apolloServer.graphqlPath}`);
    })
}

main().catch(err => console.error(err))