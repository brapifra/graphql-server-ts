import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import MongoDBConnector from "./connectors/MongoDBConnector";
import Context from "./Context";
import Auth from "./Auth";

async function bootstrap() {
  await MongoDBConnector.connect();
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*Resolver.js"],
    authChecker: Auth
  });

  const server = new GraphQLServer({ schema, context: Context });
  server.start(() => console.log(`Server is running at http://localhost:4000`));
}

bootstrap();