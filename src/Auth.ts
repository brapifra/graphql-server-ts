import JWTConfig from "./configs/JWT";
import { ContextType } from "./Context";

export default ({ context }, roles: string[]): boolean => {
  const { user }: ContextType = context;
  if (!JWTConfig.enabled) {
    return true;
  }
  if (!user) {
    return false;
  }
  if (!isSubArray(roles, user.roles)) {
    return false;
  }
  return true;
}

function isSubArray(subArray: string[], array: string[]): boolean {
  if (subArray.length > array.length) {
    return false;
  }
  for (let i = 0; i < subArray.length; i++) {
    if (array.indexOf(subArray[i]) === -1) {
      return false;
    }
  }
  return true;
}
