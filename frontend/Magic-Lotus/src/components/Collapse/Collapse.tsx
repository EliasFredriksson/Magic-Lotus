import "./collapse.scss";
import { useRef } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  direction: "vertical" | "horizontal";
  openSize: string;
}

const Collapse = (props: IProps) => {
  const { isOpen, openSize, direction, ...rest } = props;

  const collapseRef = useRef<HTMLDivElement>(null);

  const horizontalCss = {
    maxWidth: isOpen ? collapseRef.current?.scrollWidth + "px" : "0px",
    transition: "max-width 0.5s ease",
  };
  const verticalCss = {
    maxHeight: isOpen ? collapseRef.current?.scrollHeight + "px" : "0px",
    transition: "max-height 0.5s ease",
  };

  return (
    <div
      {...rest}
      className={`collapse-component${isOpen ? " open" : " closed"}${
        props.className ? ` ${props.className}` : ""
      }`}
      ref={collapseRef}
      style={direction === "vertical" ? verticalCss : horizontalCss}
    >
      <div
        className={`inner`}
        style={
          direction === "vertical"
            ? {
                height: openSize,
              }
            : {
                width: openSize,
              }
        }
      >
        {props.children ? props.children : <></>}
      </div>
    </div>
  );
};

export default Collapse;
