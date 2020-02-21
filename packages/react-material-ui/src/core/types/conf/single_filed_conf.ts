import { ValidationFunc } from "../common";
import { FormTypes, FormTypesString } from "../types";

// Base configuration params ev
export abstract class FiledConf<Y, T extends FiledConfData<Y>> {
    abstract data: T;
  }
  
  export interface FiledConfData<T> {
    type: FormTypes | FormTypesString;
    title: String;
    validationPipes?: ValidationFunc<T>[];
    default?: T;
    required?: boolean;
    props?: any;
    meta?: any;
  }
  
  export class SingleFiledConf<Y, T extends FiledConfData<Y>> extends FiledConf<
    Y,
    T
  > {
    data = ({
      type: this.type,
      title: "",
      required: false,
      props: {}
    } as any) as T;
  
    constructor(public type: FormTypes) {
      super();
      this.data.type = type;
    }
  
    get required() {
      this.data.required = true;
      return this;
    }
  
    title(title: string) {
      this.data.title = title;
      return this;
    }
  
    pipe(vp: ValidationFunc<Y>[]) {
      this.data.validationPipes = vp;
    }
  }