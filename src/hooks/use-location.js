import { useContext } from "react";
import { LocationContext } from "src/contexts/location-context";

export const useLocation = () => {
  const [state, dispatch] = useContext(LocationContext);

  return [state, dispatch];
};
