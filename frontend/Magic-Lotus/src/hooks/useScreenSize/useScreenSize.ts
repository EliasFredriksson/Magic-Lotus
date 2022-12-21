import { useEffect, useState } from "react";

interface IWindowSize {
  width: number;
  height: number;
}
interface IBreakpoints {
  IS_MOBILE: boolean;
  IS_TABLET: boolean;
  IS_LAPTOP: boolean;
  IS_DESKTOP: boolean;
}
interface IScreenSizeReturn {
  size: IWindowSize;
  breakpoints: IBreakpoints;
}

const BLANK_IBREAKPOINTS: IBreakpoints = {
  IS_MOBILE: false,
  IS_TABLET: false,
  IS_LAPTOP: false,
  IS_DESKTOP: false,
};

const useScreenSize = (): IScreenSizeReturn => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  const [breakpoints, setBreakpoints] =
    useState<IBreakpoints>(BLANK_IBREAKPOINTS);

  const checkBreakpoints = () => {
    const width = window.innerWidth;
    const breakpointChanges: IBreakpoints = { ...BLANK_IBREAKPOINTS };
    if (width < BREAKPOINTS.TABLET_SMALL) breakpointChanges.IS_MOBILE = true;
    else if (
      width >= BREAKPOINTS.TABLET_SMALL &&
      width < BREAKPOINTS.TABLET_BIG
    )
      breakpointChanges.IS_TABLET_SMALL = true;
    else if (width >= BREAKPOINTS.TABLET_BIG && width < BREAKPOINTS.LAPTOP)
      breakpointChanges.IS_TABLET_BIG = true;
    else if (width >= BREAKPOINTS.LAPTOP) breakpointChanges.IS_LAPTOP = true;
    setBreakpoints(breakpointChanges);
  };

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        // Set flags for breakpoints
        checkBreakpoints();
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return {
    size: windowSize,
    breakpoints,
  };
};

export default useScreenSize;
