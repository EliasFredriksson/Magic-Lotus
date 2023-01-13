export default interface IImage {
  fileName: string;
  file: {
    data: string;
    type: string;
  };
  uploadTime: string;
}

export const BLANK_IIMAGE: IImage = {
  fileName: "",
  file: {
    data: "",
    type: "",
  },
  uploadTime: "",
};
