import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CATEGORIES_ACTIONS_TYPES } from "./categories.types";

export const setcategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES, categoriesArray);
