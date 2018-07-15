import * as JWT from "jsonwebtoken";
import JWTConfig from "./configs/JWT";

export type ContextType = { user: { username: string, roles: string[] } };
export default ({ request }): ContextType => {
  const token = request.headers ?
    request.headers.authorization : null;
  const user: any = token ? JWT.verify(token, JWTConfig.secret) : null;
  return { user };
};