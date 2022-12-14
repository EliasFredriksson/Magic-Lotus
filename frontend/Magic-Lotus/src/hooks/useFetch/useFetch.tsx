import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import { MethodName, METHODS_MAP } from "./ServiceBase";

interface IServiceResponse<IResult> {
  success: boolean;
  error: string | null;
  data: IResult | null;
}

interface ITriggerFetch<QParams> {
  params?: QParams;
  data?: any;
}

interface IProps<IResult> {
  method: MethodName;
  route: string;
  debug?: boolean;
  onFetched: (res: IServiceResponse<IResult>) => void;
  onError?: (error: Error) => void;
}

const useFetch = <QParams, IResult>(
  props: IProps<IResult>
): {
  isLoading: boolean;
  triggerFetch: (queryParams: ITriggerFetch<QParams>) => Promise<void>;
  abort: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const triggerFetch = useCallback(async (args: ITriggerFetch<QParams>) => {
    setIsLoading(true);
    try {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      const method = METHODS_MAP.get(props.method);
      if (!method) throw new Error("Invalid fetch method. (useFetch hook)");

      const query = convertObjectToQuery(args.params);
      const data = args.data ? args.data : null;

      const res = await method<IResult>({
        route: props.route + query,
        data: data,
        options: {
          signal: abortControllerRef.current.signal,
        },
      });

      // IF DEBUG, LOG INFORMATION TO CONSOLE.
      if (props.debug) debug(query, data, res);

      // VERIFY THE STATUS CODE IS 2XX
      if (`${res.status}`.startsWith("2")) {
        props.onFetched({
          success: true,
          error: null,
          data: res.data,
        });
      } else {
        props.onFetched({
          success: false,
          error: res.statusText,
          data: null,
        });
      }
    } catch (error) {
      // if ((error as Error).name === "CanceledError") return;
      if (props.onError) props.onError(error as Error);
    }
    setIsLoading(false);
  }, []);

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
