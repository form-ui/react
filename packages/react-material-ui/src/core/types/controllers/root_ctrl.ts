import { BaseCtrlState, BaseFormCtrl } from "./base_form_ctrl";
import { ctrlMode, CtrlModeType, ctrlModeString } from "./ctrl_mode";
import { ContainableCtrl } from "./traits";

export type rootEvent = "submit";

export function createRootCtrl() {
  return new RootCtrl({ parent: null, root: null }, null);
}

interface RootCtrlState<T> extends BaseCtrlState<T> {}

export class RootCtrl<T> extends BaseFormCtrl<T, RootCtrlState<T>>
  implements ContainableCtrl<T> {
  form_data_ctrl: BaseFormCtrl | null = null;

  mount_children(ctrl: BaseFormCtrl): void {
    this.form_data_ctrl = ctrl;
  }

  unmount_children(ctrl: BaseFormCtrl): void {
    this.form_data_ctrl = null;
  }

  state: RootCtrlState<T> = {
    mode: { mode: ctrlMode.checking, type: null },
    is_err: false,
    dirty: false,
    msgs: {},
    value: undefined
  };

  protected _func: { [key: string]: Set<unknown> } = {
    submit: new Set(),
    validation: new Set()
  };

  setMode = (mode: CtrlModeType) => {
    this.state.mode = mode;
  };

  setValue = (value: T | undefined) => {
    if (this.state.value !== value) {
      this.state.value = value;
      this.emitChange();
    }
  };

  update = (value?: T) => {
    if(this.value !== value) {
      this.setValue(value);
    }
  };

  listen(event: rootEvent, func: any) {
    if (event !== "submit" && event !== "validation") {
      throw new Error(`[FormRootCtrl] ${event} is invalid event name`);
    }

    this._func[event].add(func);
  }

  unlisten(name: rootEvent, func: any) {
    if (name !== "submit" && name !== "validation") {
      throw new Error(`[FormRootCtrl] ${name} is invalid event name`);
    }

    this._func[name].delete(func);
  }

  async emit(event: rootEvent) {
    const funcs = Array.from(this._func[event] || []);
    for (const func of funcs) {
      if (typeof func == "function") {
        await func();
      }
    }
  }

  // get the form mode
  getMode(): ctrlModeString {
    return this.isNodeValid(this.getNotValidNode(this.state.mode))
      ? "valid"
      : "invalid";
  }

  // return the first invalid node
  getNotValidNode = (node: CtrlModeType): CtrlModeType => {
    switch (node.type) {
      case "field":
      case null:
      case "array":
        return node;
      case "obj":
        if (!this.isNodeValid(node)) {
          return node;
        }
        for (const key in node.fields) {
          const v = node.fields[key];
          if (!v) {
            continue;
          }
          const result = this.getNotValidNode(v);
          if (!this.isNodeValid(result)) {
            return result;
          }
        }
    }
    return { mode: ctrlMode.valid, type: null };
  };
  isNodeValid(node: CtrlModeType) {
    return node.mode === "valid";
  }
}
