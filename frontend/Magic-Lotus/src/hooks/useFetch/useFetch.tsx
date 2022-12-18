import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import useAuth from "../useAuth/useAuth";
import { MethodName, METHODS_MAP } from "./ServiceBase";

interface IHeader {
  [key: string]: string;
}

// #################################### DEFINE UNION SERVICE RESPONSE TO GET DYNAMIC TYPING ####################################
interface ServiceResult<IResult> {
  success: true;
  data: IResult;
}
interface ServiceError<IError> {
  success: false;
  data: IError;
}
type ServiceResponse<IResult, IError> =
  | ServiceResult<IResult>
  | ServiceError<IError>;
// #############################################################################################################################

interface ITriggerFetch<QParams, BodyParams> {
  params?: QParams;
  data?: BodyParams;
  headers?: IHeader;
}

interface IProps {
  method: MethodName;
  base: "SCRYFALL" | "STRAPI";
  route: string;
  debug?: boolean;
}

const debug = (query: string, data: any, res: any) => {
  console.log("\n\nQUERY:\t", query);
  console.log("DATA:\t", data);
  console.log("RES\t\t", res, "\n\n\n");
};

const useFetch = <QParams, BodyParams, IResult = any, IError = any>(
  props: IProps
): {
  isLoading: boolean;
  triggerFetch: (
    queryParams?: ITriggerFetch<QParams, BodyParams>
  ) => Promise<ServiceResponse<IResult, IError>>;
  abort: () => void;
} => {
  const { credentials } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const triggerFetch = useCallback(
    async (
      args?: ITriggerFetch<QParams, BodyParams>
    ): Promise<ServiceResponse<IResult, IError>> => {
      setIsLoading(true);
      try {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        const method = METHODS_MAP.get(props.method);
        if (!method) throw new Error("Invalid fetch method. (useFetch hook)");

        const query = convertObjectToQuery(args?.params);
        const data = args?.data ? args.data : null;

        const res = await method<IResult>({
          base: props.base,
          route: props.route + query,
          data: data,
          options: {
            signal: abortControllerRef.current.signal,
            headers: args?.headers ? args.headers : undefined,
          },
        });

        // IF DEBUG, LOG INFORMATION TO CONSOLE.
        if (props.debug) debug(query, data, res);

        // TURN OFF LOADING AND RETURN DATA.
        setIsLoading(false);
        return {
          success: true,
          data: res.data,
        };
      } catch (error) {
        // IF ERROR WAS NOT A CANCEL ERROR, UPDATE STATE
        if (!((error as Error).name === "CanceledError")) setIsLoading(false);
        if ((error as Error).name === "AxiosError") {
          return {
            success: false,
            data: (error as AxiosError<IError>).response?.data as IError,
          };
        }
        return {
          success: false,
          data: error as IError,
        };
      }
    },

    []
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return {
    isLoading,
    triggerFetch,
    abort,
  };
};

export default useFetch;
