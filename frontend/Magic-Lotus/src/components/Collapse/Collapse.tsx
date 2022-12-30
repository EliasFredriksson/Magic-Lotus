import "./collapse.scss";
import { useRef } from "react";

type IProps = {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  direction: "vertical" | "horizontal";
  openSize: string;
};

const Collapse = (props: IProps) => {
  const collapseRef = useRef<HTMLDivElement>(null);

  const horizontalCss = {
    maxWidth: props.isOpen ? collapseRef.current?.scrollWidth + "px" : 0,
    transition: "max-width 0.5s ease",
  };
  const verticalCss = {
    maxHeight: props.isOpen ? collapseRef.current?.scrollHeight + "px" : 0,
    transition: "max-height 0.5s ease",
  };

  return (
    <div
      className={`collapse-component${props.isOpen ? " open" : " closed"}${
        props.className ? ` ${props.className}` : ""
      }`}
      ref={collapseRef}
      style={props.direction === "vertical" ? verticalCss : horizontalCss}
    >
      <div
        className={`inner`}
        style={
          props.direction === "vertical"
            ? {
                height: props.openSize,
              }
            : {
                width: props.openSize,
              }
        }
      >
        {props.children ? props.children : <></>}
      </div>
    </div>
  );
};

export default Collapse;
