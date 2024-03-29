// THIS HELPER IS USED IN CONJUNCTION WITH A OBJECT STATE WHICH TRACKS IF
// INPUTS ARE VALID OR NOT. (SHOULD ONLY CONTAIN KEY: string AND VALUES: boolean)
export const isValid = (validity: Object): boolean => {
  try {
    const castedObject = validity as Record<string, boolean>;
    return Object.values(castedObject).every(
      (validState) => validState === true
    );
  } catch (e) {
    return false;
  }
};
