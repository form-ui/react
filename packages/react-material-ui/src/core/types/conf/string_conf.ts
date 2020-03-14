import { SingleFiledConf, FiledConfData } from "./single_filed_conf";
import { FormTypes } from "../types";

export type format = "ip";

export type StringFiledConfData = FiledConfData<string> & {
  format?: format;
  pattern?: string | RegExp;
  length?: {min: number, max?: number}
};


export class StringFiledConf extends SingleFiledConf<
  string,
  StringFiledConfData
> {

  length({min = 0, max = undefined}) {
    this.data.length = {min, max};
    return this;
  }

  format(format) {
    this.data.format = format;
    return this;
  }

  pattern(p: string | RegExp) {
    this.data.pattern = p;
    return this;
  }

  constructor() {
    super(FormTypes.string);
  }
}
