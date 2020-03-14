import { SingleFiledConf, FiledConfData } from "./single_filed_conf";
import { FormTypes } from "../types";

export type NumberFiledConfData<T> = FiledConfData<T> & {
  min?: number;
  max?: number;
};

export class NumberFiledConf extends SingleFiledConf<
  number,
  NumberFiledConfData<number>
> {
  min(min: number) {
    this.data.min = min;
    return this;
  }
  max(max: number) {
    this.data.max = max;
    return max;
  }
  constructor() {
    super(FormTypes.number);
  }
}
