import { BaseFormCtrl, BaseCtrlState } from "./base_form_ctrl";
import { CtrlTypes } from "../types";
import { ctrlMode } from "./ctrl_mode";

interface FiledCtrlState<T> extends BaseCtrlState<T> {}

export class FiledCtrl<T> extends BaseFormCtrl<T, FiledCtrlState<T>> {
  type = CtrlTypes.Field;

  state: FiledCtrlState<T> = {
    mode: { mode: ctrlMode.checking, type: "field" },
    is_err: false,
    dirty: false,
    msgs: {},
    value: undefined
  };

  // public update = (value?: unknown) => {
  //   this.update .update(value as any);
  // };
}
