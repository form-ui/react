import { ValidationFunc } from "../common";
import { FiledConf, FiledConfData } from "./single_filed_conf";
import { FormTypes } from "../types";
import {
  ObjCtrl,
  FormCtrl,
  FiledCtrl,
} from "../controllers";
import { FormCtrlArgs } from "../controllers/base_form_ctrl";

type ObjFields = {
  [key: string]: FiledConf<any, any>;
};

type ObjConfData<T extends object> = FiledConfData<T> & {
  fields: ObjFields;
  validationPipes: ValidationFunc<T>[];
};

export class ObjFiledConf<T extends object = object> extends FiledConf<
  T,
  ObjConfData<T>
> {
  // hold the controllers
  ctrl: {
    obj: ObjCtrl<T>;
    fields: { [key: string]: FormCtrl<any> };
  } | null = null;

  data: ObjConfData<T> = {
    type: FormTypes.object,
    title: "",
    fields: {},
    validationPipes: []
  };

  fields(fields: ObjFields) {
    this.data.fields = fields;
    return this;
  }

  createCtrl({ root, parent = null }: FormCtrlArgs) {
    this.ctrl = {
      obj: new ObjCtrl({ root, parent }, null),
      fields: {}
    };

    for (const [key, conf] of Object.entries(this.data.fields)) {
      switch (conf.data.type) {
        case "string":
        case "number":
          this.ctrl.fields[key] = new FiledCtrl(
            { root, parent: this.ctrl.obj },
            key
          );
      }
    }
    return this.ctrl;
  }
}
