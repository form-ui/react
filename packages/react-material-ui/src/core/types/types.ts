import { StringFiledConf } from "./conf";
import { ObjFiledConf } from "./conf/obj_conf";


/**
 * Run condition After
 * 
 * @export
 * @enum {number}
 */
export enum BindTo {
  Value = "Value" ,
  Parent = "Parent" ,
  Root = "Root" 
}



export type ConditionFunc<V,P,R,RES> = (value:V, parent?:P, root?:R )=> Promise<RES> | RES;

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
  
export enum CtrlTypes {
  Root = "root",
  Obj = "obj",
  Array = "array",
  Field = "field",
}

export class Types {
    static get string() {
      return new StringFiledConf();
    }
  
    static get obj() {
      return new ObjFiledConf();
    }
  
    static get number() {
      return new StringFiledConf();
    }
  
    // static get integer() {
    //   return new StringType();
    // }
  
    // static get array() {
    //   return new StringType();
    // }
  }
  
  