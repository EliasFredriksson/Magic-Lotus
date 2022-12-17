import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import useAuth from "../useAuth/useAuth";
import { MethodName, METHODS_MAP } from "./ServiceBase";

interface IHeader {
  [key: string]: string;
}

interface IServiceResponse<IResult> {
  success: boolean;
  error: string;
  data: IResult;
}

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

const useFetch = <QParams, BodyParams, IResult>(
  props: IProps
): {
  isLoading: boolean;
  triggerFetch: (
    queryParams?: ITriggerFetch<QParams, BodyParams>
  ) => Promise<IServiceResponse<IResult>>;
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
    ): Promise<IServiceResponse<IResult>> => {
      setIsLoading(true);
      try {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        const method = METHODS_MAP.get(props.method);
        if (!method) throw new Error("Invalid fetch method. (useFetch hook)");

        const query = convertObjectToQuery(args?.params);
        const data = args?.data ? args.data : null;

        // let finalHeaders: IHeader | undefined = undefined;

        // if (credentials.role !== "Public") {
        //   finalHeaders = {
        //     Authentication: `bearer ${credentials.jwt}`,
        //     ...args?.headers,
        //   };
        // } else if (args?.headers) {
        //   finalHeaders = args.headers;
        // }

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

        // VERIFY THE STATUS CODE IS 2XX
        setIsLoading(false);
        if (`${res.status}`.startsWith("2")) {
          return {
            success: true,
            error: "",
            data: res.data,
          };
        } else {
          return {
            success: false,
            error: res.statusText,
            data: res.data,
          };
        }
      } catch (error) {
        // IF ERROR WAS NOT A CANCEL ERROR, UPDATE STATE
        if (!((error as Error).name === "CanceledError")) setIsLoading(false);
        return {
          success: false,
          error: (error as Error).message,
          data: error as IResult,
        };
      }
    },
    []
  );

  const debug = useCallback((query: string, data: any, res: any) => {
    console.log("\n\nQUERY:\t", query);
    console.log("DATA:\t", data);
    console.log("RES\t\t", res, "\n\n\n");
  }, []);

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
