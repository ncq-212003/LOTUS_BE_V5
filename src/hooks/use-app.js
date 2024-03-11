import { useContext } from "react";
import { AppContext } from "src/contexts/app-context";

export const useApp = () => {
  const [state, dispatch] = useContext(AppContext);

  return [state, dispatch];
};
