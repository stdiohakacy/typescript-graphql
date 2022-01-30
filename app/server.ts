import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground"
import { ApolloServer } from "apollo-server-express"
import { connect } from "mongoose"
import { buildSchema } from "type-graphql"
import { CategoriesResolver } from "./resolvers/Categories"
import { ProductResolver } from "./resolvers/Product"
import Express from 'express'
import { UserResolver } from "./resolvers/User"
import { CartResolver } from "./resolvers/Cart"
import { OrderResolver } from "./resolvers/Order"
import { ChatResolver } from "./resolvers/Chat"
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

const main = async () => {
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

    const server = new ApolloServer({
        schema,
        plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ]
    })

    const app = Express();
    await server.start();
    server.applyMiddleware({ app, cors: false, });

    app.listen(
        { port: process.env.PORT },
        () => console.log(`Server ready and listening at http://localhost:4000${server.graphqlPath}`)
    )
}

main().catch(err => console.error(err))