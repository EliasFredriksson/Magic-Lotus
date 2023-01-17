import "./seperator.scss";

interface IProps extends React.HTMLAttributes<HTMLHRElement> {
  direction: "hor" | "ver";

  opacity?: number;
  maxWidth?: string;
  maxHeight?: string;
  size?: string;
}

export const Seperator = (props: IProps) => {
  const { opacity, direction, maxHeight, maxWidth, size, className, ...rest } =
    props;
  return (
    <hr
      {...rest}
      className={`seperator${className ? ` ${className}` : ""}`}
      style={{
        opacity: opacity ? opacity : "1",
        width: direction === "ver" ? "100%" : size ? size : "1px",
        height: direction === "ver" ? (size ? size : "1px") : "100%",
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    />
  );
};
