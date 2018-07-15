import MongoDBConnector from "../connectors/MongoDBConnector";
import * as JWT from "jsonwebtoken";
import JWTConfig from "../configs/JWT";
import * as UserTypes from "../types/User";

class UserModel {
  public static async login(username: string, password: string) {
    const res: UserTypes.User = await MongoDBConnector
      .collection("users")
      .findOne({ username, password },
        { projection: { roles: 1 } });
    if (!res) {
      throw new Error("Wrong credentials");
    }
    return getToken(username, res.roles);
  }

  public static async create(user) {
    const d = new Date();
    const res = await MongoDBConnector
      .collection("users")
      .insertOne({ ...user, created: d, modified: d });
    return res.ops[0];
  }

  public static async update(username: string, fieldsToUpdate) {
    const d = new Date();
    const res = await MongoDBConnector
      .collection("users")
      .findOneAndUpdate(
        { username },
        { $set: { ...fieldsToUpdate, created: d, modified: d } },
        { returnOriginal: false },
    );
    return res.value;
  }

  public static async get(username: string) {
    return MongoDBConnector
      .collection("users")
      .findOne({ username });
  }
}

export default UserModel;

const getToken = (username: string, roles: UserTypes.UserRoles[]) => {
  try {
    const token = JWT.sign(
      { username, roles },
      JWTConfig.secret,
      { expiresIn: JWTConfig.expiresIn + "d" }
    );
    const d = new Date();
    d.setDate(d.getDate() + JWTConfig.expiresIn);
    return {
      expiresIn: d,
      token,
      roles
    };
  } catch (e) {
    throw new Error("JWT error");
  }
}