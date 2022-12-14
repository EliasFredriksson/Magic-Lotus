import axios, { AxiosRequestConfig } from "axios";

interface IFetchOptions {
  route: string;
  data?: any;
  options: AxiosRequestConfig;
}

const POST = async <T>(args: IFetchOptions) => {
  return await axios.post<T>(
    `${import.meta.env.VITE_SCRYFALL_API + args.route}`,
    args.data && args.data,
    args.options
  );
};

const PUT = async <T>(args: IFetchOptions) => {
  return await axios.put<T>(
    `${import.meta.env.VITE_SCRYFALL_API + args.route}`,
    args.data && args.data,
    args.options
  );
};

const GET = async <T>(args: IFetchOptions) => {
  return await axios.get<T>(
    `${import.meta.env.VITE_SCRYFALL_API + args.route}`,
    args.options && args.options
  );
};

const DELETE = async <T>(args: IFetchOptions) => {
  return await axios.delete<T>(
    `${import.meta.env.VITE_SCRYFALL_API + args.route}`,
    args.options && args.options
  );
};

// EXPORTED FETCH METHODS
export type MethodName = "POST" | "PUT" | "GET" | "DELETE";

// GENERATE TYPES.
const METHOD_FUNCTIONS = [POST, PUT, GET, DELETE] as const;
type FetchFunction = typeof METHOD_FUNCTIONS[number];

// EXPORTED MAP TO GET FETCH FUNCTIONS.
export const METHODS_MAP = new Map<MethodName, FetchFunction>([
  ["GET", GET],
  ["POST", POST],
  ["PUT", PUT],
  ["DELETE", DELETE],
]);
