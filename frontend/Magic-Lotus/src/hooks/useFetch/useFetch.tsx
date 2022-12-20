import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertObjectToQuery } from "../../helpers/QueryConverter";
import useAuth from "../useAuth/useAuth";
import { MethodName, METHODS_MAP } from "./ServiceBase";

// #############################################################################################################################

interface ITriggerFetch<QParams, BodyParams> {
  params?: QParams;
  data?: BodyParams;
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

const useFetch = <IResult = any, BodyParams = any, QParams = any>(
  props: IProps
): {
  isLoading: boolean;
  triggerFetch: (
    queryParams?: ITriggerFetch<QParams, BodyParams>
  ) => Promise<IResult>;
  abort: () => void;
} => {
  const { credentials } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  const triggerFetch = useCallback(
    async (args?: ITriggerFetch<QParams, BodyParams>): Promise<IResult> => {
      setIsLoading(true);
      try {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        const method = METHODS_MAP.get(props.method);
        if (!method) throw new Error("Invalid fetch method. (useFetch hook)");

        const query = props.encodeUri
          ? encodeURI(convertObjectToQuery(args?.params))
          : convertObjectToQuery(args?.params);
        const data = args?.data ? args.data : null;

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
      } catch (error) {
        // IF ERROR WAS NOT A CANCEL ERROR, UPDATE STATE
        if (!((error as Error).name === "CanceledError")) setIsLoading(false);
        if ((error as Error).name === "AxiosError") {
          return (error as AxiosError<IResult>).response?.data as IResult;
        }
        return error as IResult;
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
