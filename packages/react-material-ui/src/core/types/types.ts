import { StringFiledConf } from "./string_conf";



export enum FormTypes {
    string = "string",
    object = "object",
    array = "array",
    number = "number",
    integer = "integer",
    float = "float",
    boolean = "boolean",
  }
  
  export type FormTypesString = "string"
    | "object"
    | "array"
    | "number"
    | "integer"
    | "float"
    | "boolean";
  


export class Types {
    static get string() {
      return new StringFiledConf();
    }
  
    static get obj() {
      return new ObjFiledConf();
    }
  
    static get string() {
      return new StringType();
    }
  
    static get string() {
      return new StringType();
    }
  
    static get string() {
      return new StringType();
    }
  }
  
  