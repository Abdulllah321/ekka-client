import toast from "react-hot-toast";
import { useAppSelector } from "../store";

export const useAuthenticatedAction = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const execute = async (
    action: () => Promise<void>,
    errorMessage?: string
  ) => {
    if (!isAuthenticated) {
      toast.error(
        errorMessage || "You need to be logged in to perform this action"
      );
      return;
    }
    try {
      await action();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return { execute };
};
