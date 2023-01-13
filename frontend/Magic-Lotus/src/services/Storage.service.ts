type ServiceResponseSuccess<T> = {
  success: true;
  data: T;
  error: "";
};
type ServiceResponseFailed<T> = {
  success: false;
  data: null;
  error: string;
};

type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseFailed<T>;

// ##### LOCAL / SESSIONS STORAGE SERVICE,  BUILT WITH SERVICERESPONSE #####
type STORAGE_METHOD = "SESSION" | "LOCAL";

const getMethod = (method: STORAGE_METHOD): Storage => {
  return method === "LOCAL" ? localStorage : sessionStorage;
};

export const storageSetItem = (
  method: STORAGE_METHOD,
  key: string,
  data: any
): ServiceResponse<null> => {
  try {
    const m = getMethod(method);
    const strigified = JSON.stringify(data);
    m.setItem(key, strigified);
    return {
      success: true,
      error: "",
      data: null,
    };
  } catch (e) {
    return {
      success: false,
      error: (e as Error).message,
      data: null,
    };
  }
};

export const storageGetItem = <T>(
  method: STORAGE_METHOD,
  key: string
): ServiceResponse<T> => {
  try {
    const m = getMethod(method);
    const stored = m.getItem(key);
    if (stored) {
      return {
        success: true,
        error: "",
        data: JSON.parse(stored) as T,
      };
    } else
      return {
        success: false,
        error: `No data found stored with key: ${key}`,
        data: null,
      };
  } catch (e) {
    return {
      success: false,
      error: (e as Error).message,
      data: null,
    };
  }
};

export const storageRemoveItem = (
  method: STORAGE_METHOD,
  key: string
): ServiceResponse<null> => {
  const m = getMethod(method);
  m.removeItem(key);
  return {
    success: true,
    error: "",
    data: null,
  };
};

export const storageClear = (method: STORAGE_METHOD): ServiceResponse<null> => {
  const m = getMethod(method);
  m.clear();
  return {
    success: true,
    error: "",
    data: null,
  };
};
