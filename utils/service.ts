import { toast } from "react-hot-toast";

export const unavailableActionToast = () =>
  toast.error("This action is unavailable right now.");
