import { useEffect, useState } from "react";

const BREAKPOINT_TABLET = 768;
const BREAKPOINT_LAPTOP = 1024;
const BREAKPOINT_DESKTOP = 1200;

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
    if (width < BREAKPOINT_TABLET) breakpointChanges.IS_MOBILE = true;
    else if (width >= BREAKPOINT_TABLET && width < BREAKPOINT_LAPTOP)
      breakpointChanges.IS_TABLET = true;
    else if (width >= BREAKPOINT_LAPTOP && width < BREAKPOINT_DESKTOP)
      breakpointChanges.IS_LAPTOP = true;
    else if (width >= BREAKPOINT_DESKTOP) breakpointChanges.IS_DESKTOP = true;
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
