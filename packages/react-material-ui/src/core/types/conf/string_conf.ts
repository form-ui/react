import { SingleFiledConf, FiledConfData } from "./single_filed_conf";
import { FormTypes } from "../types";

export type format = "ip";

export type StringFiledConfData = FiledConfData<string> & {
  format?: format;
  pattern?: string | RegExp;
};


export class StringFiledConf extends SingleFiledConf<
  string,
  StringFiledConfData
> {

  constructor() {
    super(FormTypes.string);
  }
}
