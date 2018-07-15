import { Resolver, Query, Authorized, Ctx, Arg, Mutation } from "type-graphql";
import { ContextType } from "../Context";
import * as UserTypes from "../types/User";
import { UserRoles } from "../types/User";
import UserModel from "../models/UserModel";

@Resolver()
export default class UserResolver {
  @Query(returns => UserTypes.JWT)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
  ) {
    return UserModel.login(username, password);
  }

  @Authorized()
  @Query(returns => UserTypes.User)
  async getUser(
    @Arg("username") username: string,
    @Ctx() { user }: ContextType
  ) {
    if (username && user.roles.includes("ADMIN")) {
      return UserModel.get(username);
    }
    return UserModel.get(user.username);
  }

  @Mutation(returns => UserTypes.User, { nullable: true })
  async createUser(
    @Arg("input") input: UserTypes.CreateUserInput,
    @Ctx() { user }: ContextType
  ) {
    if (input.roles.includes(UserRoles.admin) && (!user || !user.roles.includes("ADMIN"))) {
      throw new Error("Admin users can only be created by another admin user");
    }
    return UserModel.create(input);
  }

  @Authorized()
  @Mutation(returns => UserTypes.User, { nullable: true })
  async updateUser(
    @Arg("username") username: string,
    @Arg("input") input: UserTypes.CreateUserInput,
    @Ctx() { user }: ContextType
  ) {
    if (input.roles.includes(UserRoles.admin) && !user.roles.includes("ADMIN")) {
      throw new Error("Admin users can only be created by another admin user");
    }
    if (!user.roles.includes("ADMIN") && username !== user.username) {
      throw new Error("You can't update other's profile");
    }
    return UserModel.update(username, input);
  }
}