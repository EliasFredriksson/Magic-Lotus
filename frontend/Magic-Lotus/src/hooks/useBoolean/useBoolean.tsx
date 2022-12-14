import { useCallback, useState } from "react";

interface IProps {
  initValue?: boolean;
}

const useBoolean = (
  props?: IProps
): {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
} => {
  const [bool, setBool] = useState(props?.initValue ? props.initValue : false);
  const on = useCallback(() => {
    setBool(true);
  }, []);
  const off = useCallback(() => {
    setBool(false);
  }, []);
  const toggle = useCallback(() => {
    setBool((prev) => !prev);
  }, []);

  return {
    value: bool,
    on,
    off,
    toggle,
  };
};

export default useBoolean;
