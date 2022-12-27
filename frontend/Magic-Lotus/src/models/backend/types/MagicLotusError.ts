import { MethodName } from "../../../hooks/useFetch/ServiceBase";

type MagicLotusError = {
  object: "magic_lotus_error";
  data: "";
  error: string;
  method: MethodName;
  route: string;
  status: number;
};
export default MagicLotusError;
