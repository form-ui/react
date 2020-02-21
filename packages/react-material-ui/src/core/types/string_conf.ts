import { SingleFiledConf, FiledConfData } from "./common";

export type format = "ip";

export type StringFiledConfData = FiledConfData<string> & {
  format?: format;
  pattern?: string | RegExp;
};

export class StringFiledConf extends SingleFiledConf<StringFiledConfData> {}
