import { BaseFormCtrl } from "./common";
import { REPL_MODE_SLOPPY } from "repl";

function createRootCtrl() {
  return new RootCtrl({parent: null, root: null});
}

export type rootEvent = "submit";

export type ctrlModeString = "valid" | "invalid" | "check";

export enum ctrlMode {
  valid = "valid",
  invalid = "invalid",
  check = "check"
}

export type CtrlModeType =
  | FieldMode
  | ObjMode
  | ArrayMode
  | { mode: ctrlMode; type: "empty" };

export type FieldMode = {
  type: "field";
  mode: ctrlMode;
};
// todo
export type ArrayMode = {
  type: "array";
  mode: ctrlMode;
};

export type ObjMode = {
  type: "obj";
  mode: ctrlMode;
  fields: { [key: string]: CtrlModeType };
};

export class RootCtrl<T> extends BaseFormCtrl<T> {
  private _value: T | null = null;
  private _mode: CtrlModeType = { mode: ctrlMode.check, type: "empty" };

  private _func: { [key: string]: Set<unknown> } = {
    submit: new Set(),
    validation: new Set()
  };

  get value() {
    return this._value;
  }

  setMode(mode: CtrlModeType) {
    this._mode = mode;
  }

  setValue(value: T) {
    this._value = value;
  }

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
    return this.isNodeValid(this.getNotValidNode(this._mode))
      ? "valid"
      : "invalid";
  }

  // return the first invalid node
  getNotValidNode = (node: CtrlModeType): CtrlModeType => {
    switch (node.type) {
      case "field":
      case "empty":
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
    return { mode: ctrlMode.valid, type: "empty" };
  };
  isNodeValid(node: CtrlModeType) {
    return node.mode === "valid";
  }
}
