import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import { MethodName, METHODS_MAP } from "./ServiceBase";

interface ITriggerFetch<QParams> {
  params?: QParams;
  data?: any;
}

interface IProps<QParams> {
  method: MethodName;
  route: string;
  debug?: boolean;
}

const useFetch = <QParams, IResult>(
  props: IProps<QParams>
): {
  isLoading: boolean;
  success: boolean;
  error: string;
  res: AxiosResponse<IResult> | null;
  triggerFetch: (queryParams: ITriggerFetch<QParams>) => Promise<void>;
  abort: () => void;
} => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const [res, setRes] = useState<AxiosResponse<IResult> | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const triggerFetch = useCallback(async (args: ITriggerFetch<QParams>) => {
    setIsLoading(true);
    try {
      setRes(null);
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

      if (props.debug) debug(query, data, res);

      // VERIFY THE STATUS CODE IS 2XX
      if (`${res.status}`.startsWith("2")) {
        setSuccess(true);
        setError("");
      } else {
        setSuccess(false);
        setError(res.statusText);
      }

      setRes(res);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setError((error as Error).message);
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
    success,
    error,
    res,
    triggerFetch,
    abort,
  };
};

export default useFetch;
