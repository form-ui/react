import { BaseFormCtrl, BaseCtrlState } from "./base_form_ctrl";
import { ctrlMode } from "./ctrl_mode";

import { PartialUpdatableCtrl, ContainableCtrl, FormCtrl } from "./traits";

export interface ObjCtrlState<T> extends BaseCtrlState<T> {}

function checkKey(key: unknown) {
  if (typeof key !== "string") {
    throw new Error(
      `[ObjCtrl:mount_children] ctrl.key must to be a string, got: ${key}`
    );
  }
  return key;
}

export class ObjCtrl<T extends Object> extends BaseFormCtrl<T, ObjCtrlState<T>>
  implements ContainableCtrl<T>, PartialUpdatableCtrl<T> {
  private _children: Map<string, FormCtrl> = new Map();

  // todo
  state = {
    mode: { mode: ctrlMode.checking, type: "obj", fields: {} },
    is_err: false,
    dirty: false,
    msgs: {},
    value: undefined
  } as any;

  updatePartial = (key: unknown, value: unknown) => {
    if (typeof key !== "string") {
      throw new Error(`[ObjCtrl::update] The key must to be a string`);
    }
    const newVal = { ...(this.value || {}), [key]: value } as T;
    this.update(newVal);
  };

  // the function called by emitChange function
  update_mounted= ()=> {
    const value: any = this.value || {};
    for(const [key, ctrl] of Array.from( this._children)) {
      ctrl.setValue(value[key]);
    }
  }

  mount_children(ctrl: FormCtrl) {
    const key = checkKey(ctrl.key);
    this._children.set(key, ctrl);
  }

  unmount_children(ctrl: FormCtrl) {
    const key = checkKey(ctrl.key);
    this._children.delete(key);
  }
}
