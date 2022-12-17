import axios, { AxiosRequestConfig } from "axios";

interface IFetchOptions {
  base: "SCRYFALL" | "STRAPI";
  route: string;
  options: AxiosRequestConfig;
  data?: any;
}

const BASE_SCRYFALL = import.meta.env.VITE_SCRYFALL_API;
const BASE_STRAPI = import.meta.env.VITE_STRAPI_API;

const POST = async <T>(args: IFetchOptions) => {
  let base;
  if (args.base === "STRAPI") base = BASE_STRAPI;
  else if (args.base === "SCRYFALL") base = BASE_SCRYFALL;
  if (!base) throw new Error("No baseURL provided for POST (ServiceBase.ts)");
  return await axios.post<T>(
    `${base + args.route}`,
    args.data && args.data,
    args.options
  );
};

const PUT = async <T>(args: IFetchOptions) => {
  let base;
  if (args.base === "STRAPI") base = BASE_STRAPI;
  else if (args.base === "SCRYFALL") base = BASE_SCRYFALL;
  if (!base) throw new Error("No baseURL provided for PUT (ServiceBase.ts)");
  return await axios.put<T>(
    `${base + args.route}`,
    args.data && args.data,
    args.options
  );
};

const GET = async <T>(args: IFetchOptions) => {
  let base;
  if (args.base === "STRAPI") base = base = BASE_STRAPI;
  else if (args.base === "SCRYFALL") base = BASE_SCRYFALL;
  if (!base) throw new Error("No baseURL provided for GET (ServiceBase.ts)");

  console.log("BASE: ", base);

  return await axios.get<T>(`${base + args.route}`, args.options);
};

const DELETE = async <T>(args: IFetchOptions) => {
  let base;
  if (args.base === "STRAPI") base = base = BASE_STRAPI;
  else if (args.base === "SCRYFALL") base = BASE_SCRYFALL;
  if (!base) throw new Error("No baseURL provided for DELETE (ServiceBase.ts)");
  return await axios.delete<T>(`${base + args.route}`, args.options);
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
