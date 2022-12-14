export function convertObjectToQuery<T>(object: T): string {
  if (!object) return "";
  const obj = object as Object;
  let query = "?";
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" || Array.isArray(value)) {
      query += recursiveStringConvert(value, key);
    } else {
      if (typeof value === "string") {
        if (value.length > 0) query += `${key}=${value}&`;
      } else query += `${key}=${value}&`;
    }
  });
  return query;
}

function recursiveStringConvert(data: any, givenKey?: string): string {
  let tempString = "";
  if (Array.isArray(data)) {
    data.forEach((value) => {
      tempString += recursiveStringConvert(value, givenKey);
    });
  } else if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value))
        tempString += recursiveStringConvert(value, givenKey);
      else if (typeof value === "object")
        tempString += recursiveStringConvert(value, key);
      else {
        if (typeof value === "string") {
          if (value.length > 0) tempString += `${givenKey}=${value}&`;
        } else tempString += `${givenKey}=${value}&`;
      }
    });
  } else tempString += `${givenKey}=${data}&`;
  return tempString;
}
