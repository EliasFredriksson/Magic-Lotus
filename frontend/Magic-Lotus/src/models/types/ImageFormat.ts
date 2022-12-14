type Formats =
  | "png"
  | "border_crop"
  | "art_crop"
  | "large"
  | "normal"
  | "small";

type ImageFormat = {
  [Property in Formats]: string;
};

export default ImageFormat;
