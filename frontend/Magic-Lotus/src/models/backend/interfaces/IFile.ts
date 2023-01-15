export default interface IFile {
  name: string;
  file: string;
  type: string;
}

export const BLANK_IFILE: IFile = {
  name: "",
  file: "",
  type: "",
};
