import { BaseFormCtrl, BaseCtrlState } from "./base_form_ctrl";
import { ctrlMode } from "./ctrl_mode";
import { CtrlTypes } from "../types";

interface FiledCtrlState<T> extends BaseCtrlState<T> {}

export class FiledCtrl<T> extends BaseFormCtrl<T, FiledCtrlState<T>> {
  type = CtrlTypes.Field;



  // public update = (value?: unknown) => {
  //   this.update .update(value as any);
  // };
}
