import React from "react";

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

const Flex = (props: Props) => {
  const { children, direction, justify, align, gap, style, ...rest } = props;
  return (
    <div
      {...rest}
      style={{
        ...style,
        display: "flex",
        flexDirection: direction ? direction : "row",
        justifyContent: justify ? justify : "flex-start",
        alignItems: align ? align : "stretch",
        gap: gap,
      }}
    >
      {props.children}
    </div>
  );
};

export default Flex;
