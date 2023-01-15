import "./seperator.scss";

interface IProps {
  direction: "hor" | "ver";

  opacity?: number;
  maxWidth?: string;
  maxHeight?: string;
  size?: string;
}

export const Seperator = ({
  opacity,
  direction,
  maxHeight,
  maxWidth,
  size,
}: IProps) => {
  return (
    <hr
      className={`seperator`}
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
