import useFetch from "../../hooks/useFetch/useFetch";
import IFile from "../../models/backend/interfaces/IFile";
import MagicLotusError from "../../models/backend/types/MagicLotusError";
import MagicLotusResponse from "../../models/backend/types/MagicLotusResponse";
// ################################ ROUTE ################################
// Upload currently logged in users avatar image.
// POST     /users/avatar
type AvatarBody = {
  file: IFile;
};
export const useFetchPostUserAvatar = () => {
  return useFetch<MagicLotusResponse<IFile>, MagicLotusError, AvatarBody, null>(
    {
      base: "BACKEND",
      method: "POST",
      route: "/users/avatar",
    }
  );
};
