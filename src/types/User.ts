import { ObjectType, InputType, Field, registerEnumType } from "type-graphql";
import { EmailAddress, DateTime } from "@okgrow/graphql-scalars";

export enum UserRoles {
  admin
}
registerEnumType(UserRoles, {
  name: "UserRoles"
});


@ObjectType()
export class JWT {
  @Field(type => String, { nullable: true })
  token: String

  @Field(type => DateTime, { nullable: true })
  expiresIn: DateTime

  @Field(type => UserRoles, { nullable: true })
  roles: [UserRoles]
}

@ObjectType()
export class User {
  @Field(type => EmailAddress, { nullable: true })
  email?: EmailAddress;

  @Field(type => String, { nullable: true })
  username?: String

  @Field(type => String, { nullable: true })
  password?: String

  @Field(type => String, { nullable: true })
  fullName?: String

  @Field(type => DateTime, { nullable: true })
  birthday?: DateTime

  @Field(type => String, { nullable: true })
  class?: String

  @Field(type => [UserRoles], { nullable: true })
  roles?: [UserRoles]

  @Field(type => DateTime, { nullable: true })
  created?: DateTime

  @Field(type => DateTime, { nullable: true })
  modified?: DateTime
}

@InputType()
export class CreateUserInput {
  @Field(type => EmailAddress)
  email: EmailAddress;

  @Field(type => String)
  username: String

  @Field(type => String)
  password: String

  @Field(type => String)
  fullName: String

  @Field(type => DateTime)
  birthday: DateTime

  @Field(type => String)
  class: String

  @Field(type => UserRoles)
  roles: [UserRoles]
}

@InputType()
export class UpdateUserInput {
  @Field(type => EmailAddress, { nullable: true })
  email?: EmailAddress;

  @Field(type => String, { nullable: true })
  username?: String

  @Field(type => String, { nullable: true })
  password?: String

  @Field(type => String, { nullable: true })
  fullName?: String

  @Field(type => DateTime, { nullable: true })
  birthday?: DateTime

  @Field(type => String, { nullable: true })
  class?: String

  @Field(type => [UserRoles], { nullable: true })
  roles?: [UserRoles]
}