import { MethodName } from "../../../hooks/useFetch/ServiceBase";

type IServiceResponseSuccess<T> = {
  success: true;
  data: T;
  error: string;
  method: MethodName;
  route: string;
  status: number;
};
type IServiceResponseError = {
  success: false;
  data: "";
  error: string;
  method: MethodName;
  route: string;
  status: number;
};

type IServiceResponse<T> = IServiceResponseSuccess<T> | IServiceResponseError;

export default IServiceResponse;
