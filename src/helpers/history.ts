import { Location, NavigateFunction } from "react-router-dom";

type History = {
  navigate: NavigateFunction | null;
  location: Location | null;
};

/**
 * global application history
 */
export const history: History = {
  navigate: null,
  location: null,
};
