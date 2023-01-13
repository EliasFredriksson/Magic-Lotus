import { AxiosError, AxiosResponse, CanceledError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import { MethodName, METHODS_MAP } from "./ServiceBase";

// #############################################################################################################################

type AbortedError = {
  object: "aborted";
};

type NetworkError = {
  object: "network_error";
  error: string;
};

type UnknownError = {
  object: "unknown_error";
  error?: any;
};

interface ITriggerFetch<QParams, BodyParams> {
  params?: QParams;
  body?: BodyParams;
}

interface IProps {
  method: MethodName;
  base: "SCRYFALL" | "BACKEND";
  route: string;
  debug?: boolean;
  encodeUri?: boolean;
}

const debug = (query: string, data: any, res: any) => {
  console.log("\n\nQUERY:\t", query);
  console.log("DATA:\t", data);
  console.log("RES\t\t", res, "\n\n\n");
};

const useFetch = <IResult = any, IError = any, BodyParams = any, QParams = any>(
  props: IProps
): {
  isLoading: boolean;
  triggerFetch: (
    args?: ITriggerFetch<QParams, BodyParams>
  ) => Promise<IResult | IError | AbortedError | NetworkError | UnknownError>;
  abort: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const triggerFetch = useCallback(
    async (
      args?: ITriggerFetch<QParams, BodyParams>
    ): Promise<
      IResult | IError | AbortedError | NetworkError | UnknownError
    > => {
      setIsLoading(true);
      try {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        const method = METHODS_MAP.get(props.method);
        if (!method) throw new Error("Invalid fetch method. (useFetch hook)");

        const query = props.encodeUri
          ? encodeURI(convertObjectToQuery(args?.params))
          : convertObjectToQuery(args?.params);

        const data = args?.body ? args.body : null;

        const res = await method<IResult>({
          base: props.base,
          route: props.route + query,
          data: data,
          options: {
            signal: abortControllerRef.current.signal,
          },
        });

        // IF DEBUG, LOG INFORMATION TO CONSOLE.
        if (props.debug) debug(query, data, res);

        // TURN OFF LOADING AND RETURN DATA.
        setIsLoading(false);
        return res.data;
      } catch (e) {
        const error = e as AxiosError | Error;
        console.log("ERROR: ", error);
        // IF ERROR WAS NOT A CANCEL ERROR, UPDATE STATE
        if (error.name === "CanceledError") {
          return { object: "aborted" } as AbortedError;
        }
        setIsLoading(false);

        if (error.name === "AxiosError") {
          const axErr = error as AxiosError<IError>;
          if (axErr.code === "ERR_NETWORK")
            return {
              object: "network_error",
              error: axErr.message,
            };
          else {
            if (axErr.response) return axErr.response.data as IError;
            else {
              return {
                object: "unknown_error",
                error: axErr,
              } as UnknownError;
            }
          }
        }

        if (error.name === "AxiosError") {
          const axErr = error as AxiosError;
          if (axErr.code === "ERR_NETWORK") {
            return {
              object: "network_error",
              error: axErr.message,
            };
          } else {
            return (error as AxiosError<IError>).response?.data as IError;
          }
        } else
          return {
            object: "unknown_error",
            error: (error as Error).message,
          } as UnknownError;
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
