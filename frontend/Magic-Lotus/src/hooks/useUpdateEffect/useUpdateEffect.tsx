import { DependencyList, EffectCallback, useEffect } from "react";
import useIsFirstRender from "../useIsFirstRender/useIsFirstRender";

// ALL THIS HOOK DOSE IS MIMIC THE BEHAVIOR OF useEffect EXCEPT
// IGNORES THE FIRST RENDER. THE OPOSITE OF useIsFirstRender.
const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFirst = useIsFirstRender();
  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
