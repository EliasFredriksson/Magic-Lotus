import "./seperator.scss";

interface IProps {
  direction: "hor" | "ver";

  opacity?: number;
  maxWidth?: string;
  maxHeight?: string;
}

export const Seperator = ({
  opacity,
  direction,
  maxHeight,
  maxWidth,
}: IProps) => {
  return (
    <hr
      className={`seperator`}
      style={{
        opacity: opacity ? opacity : "1",
        width: direction === "ver" ? "100%" : "1px",
        height: direction === "ver" ? "1px" : "100%",
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    />
  );
};
