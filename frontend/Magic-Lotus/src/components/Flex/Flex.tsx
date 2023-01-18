import React from "react";
import "./flex.scss";

type Direction =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse"
  | "initial"
  | "inherit"
  | "unset";
type Justify =
  | "center"
  | "start"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "baseline"
  | "flex-end"
  | "flex-start"
  | "first baseline"
  | "last baseline"
  | "safe"
  | "unsafe"
  | "initial"
  | "inherit"
  | "unset";
type Align =
  | "center"
  | "stretch"
  | "baseline"
  | "flex-end"
  | "flex-start"
  | "initial"
  | "inherit"
  | "unset";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  direction?: Direction;
  justify?: Justify;
  align?: Align;
  gap?: string;
}

// THIS COMPONENT IS A BIT WORK IN PROGRESS.

const Flex = (props: Props) => {
  const {
    children,
    direction,
    justify,
    align,
    gap,
    style,
    className,
    ...rest
  } = props;
  return (
    <div
      {...rest}
      className={`flex-component${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        display: "flex",
        flexDirection: direction ? direction : "row",
        justifyContent: justify ? justify : "flex-start",
        alignItems: align ? align : "stretch",
        gap: gap ? gap : undefined,
      }}
    >
      {props.children}
    </div>
  );
};

export default Flex;
