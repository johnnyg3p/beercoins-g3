interface IThumb {
  src?: string;
  text?: string;
  size: IThumbSizes;
}

type IThumbSizes = "small" | "medium" | "large";

interface IBalance {
  saldo: number;
}
