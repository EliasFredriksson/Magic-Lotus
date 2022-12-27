import { MethodName } from "../../../hooks/useFetch/ServiceBase";

type MagicLotusResponse<T> = {
  object: "magic_lotus_success";
  data: T;
  error: string;
  method: MethodName;
  route: string;
  status: number;
};

export default MagicLotusResponse;
