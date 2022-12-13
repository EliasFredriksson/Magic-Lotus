import axios, { AxiosRequestConfig } from "axios";

export const POST = async <T>(
  route: string,
  data: any,
  options?: AxiosRequestConfig
) => {
  return await axios.post<T>(
    `${import.meta.env.VITE_SCRYFALL_API + route}`,
    data,
    options && options
  );
};

export const PUT = async <T>(
  route: string,
  data: any,
  options?: AxiosRequestConfig
) => {
  return await axios.put<T>(
    `${import.meta.env.VITE_SCRYFALL_API + route}`,
    data,
    options && options
  );
};

export const GET = async <T>(route: string, options?: AxiosRequestConfig) => {
  return await axios.get<T>(
    `${import.meta.env.VITE_SCRYFALL_API + route}`,
    options && options
  );
};

export const DELETE = async <T>(
  route: string,
  options?: AxiosRequestConfig
) => {
  return await axios.delete<T>(
    `${import.meta.env.VITE_SCRYFALL_API + route}`,
    options && options
  );
};
