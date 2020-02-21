import { RootCtrl, ctrlMode } from "./root_ctrl"
import { BaseFormCtrl, BaseCtrlState } from "./root_ctrl"

export interface ObjCtrlState<T> extends BaseCtrlState<T> {

}

function checkKey(key:unknown) {
   if (typeof key !== "string") {
      throw new Error(`[ObjCtrl:mount_children] ctrl.key must to be a string, got: ${key}`);
   } 
   return key;
}

export class ObjCtrl<T extends Object> extends BaseFormCtrl<ObjCtrlState<T>> {

   private _children: Map<string, BaseFormCtrl> = new Map();
   
   // todo
   state = {
      mode: { mode: ctrlMode.checking, type: "obj", fields: {} },
      is_err: false,
      dirty: false,
      msgs: {},
      value: undefined
    } as any;
   

   mount_children(ctrl: BaseFormCtrl) {
      const key = checkKey(ctrl.key);
      this._children.set(key, ctrl);
   }
 
   unmount_children(ctrl: BaseFormCtrl) {
      const key = checkKey(ctrl.key);
      this._children.delete(key) 
   }

   onChange(name: string, value: unknown) {
      const newVal = {...(this.value || {}), [name]: value};
      const parent = this.parent;
      if (!parent) return;
      parent.update(this.key, newVal);
   }
}