import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setcurrentUser = (user) => {
  if (!user) return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, null);

  const { uid, email, displayName } = user; // Extract serializable data
  const userData = { uid, email, displayName };

  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, userData);
};
