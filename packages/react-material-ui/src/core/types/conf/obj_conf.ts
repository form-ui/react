import { ValidationFunc } from "../common";
import { FiledConf, FiledConfData } from "./single_filed_conf";
import { FormTypes } from "../types";
import { RootCtrl, mountableCtrl, ObjCtrl, BaseFormCtrl } from "../controllers";
import { StringFiledConf } from "./string_conf";

type ObjFields = {
    [key: string]: FiledConf<any, ObjConfData<any>>;
  }

type ObjConfData<T extends object> = FiledConfData<T> & {
  fields: ObjFields;
  validationPipes: ValidationFunc<T>[];
};

export class ObjFiledConf<T extends object = object> extends FiledConf<
  T,
  ObjConfData<T>
> {
    // hold the controllers
    ctrl: {[key: string]: BaseFormCtrl}= {

    }
  data = {
    type: FormTypes.object,
    title: "",
    fields: {},
    validationPipes: []
  };

  fields(fields: ObjFields) {
    this.data.fields = fields;
    return this;
  }

  createCtrl({
    root,
    parent
  }: {
    root: RootCtrl<any>;
    parent?: mountableCtrl<any>;
  }) {
    this.ctrl = {};
   
    const obj_ctrl = new ObjCtrl( { root, parent }, null);

    for (const [key, conf] of Object.entries(this.data.fields)) {
        switch(conf.data.type) {
            case "string":
                ctrl[key] = StringFiledConf({root, parent: obj_ctrl} , key)
            case "number": 

        }
    }
  }
}
