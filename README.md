# GraphQL Server Boilerplate for Typescript

Ready-to-use GraphQL Server Boilerplate written in Typescript.

## Dependencies

+ @okgrow/graphql-scalars -> Some custom types (Email, date...)
+ graphql-yoga -> Server
+ jsonwebtoken -> JWT authentication & authorization
+ mongodb -> DB used in this example
+ type-graphql -> Create the schema, types and resolvers only with TypeScript

# Project structure

+ `configs`: Configuration files for database connectors and middlewares.
+ `connectors`:  Layer on top of a database/backend driver.
+ `models`: Set of functions to fetch data of a certain GraphQL type by using various connectors.
+ `resolvers`: GraphQL resolvers written in [Typescript](https://19majkel94.github.io/type-graphql/)
+ `types`: GraphQL types written in [Typescript](https://19majkel94.github.io/type-graphql/)
+ `Auth.ts`: AuthChecker for [type-graphql](https://19majkel94.github.io/type-graphql/docs/authorization.html#how-to-use)
+ `Context.ts`: Context function for Graphql Server. It passes the user info to the resolvers.
+ `index.ts`: Server bootstrapping