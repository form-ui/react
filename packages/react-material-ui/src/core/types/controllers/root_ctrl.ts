import { FieldMessages } from "../common";

export type rootEvent = "submit";

export type ctrlModeString = "valid" | "invalid" | "checking" | "unchecked";

export enum ctrlMode {
  valid = "valid",
  invalid = "invalid",
  checking = "checking",
  unchecked = "unchecked"
}

export type CtrlModeType =
  | FieldMode
  | ObjMode
  | ArrayMode
  | { mode: ctrlMode; type: null };
 
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

export interface BaseFormCtrlArgs<R = any, P = any> {
  root: null | RootCtrl<R>;
  parent: null | mountableCtrl<P, BaseCtrlState<P>>;
}

export interface BaseCtrlState<T> {
  value?: T;
  mode: CtrlModeType;
  is_err: boolean;
  dirty: boolean;
  msgs: FieldMessages;
}

export abstract class BaseFormCtrl<
  V = unknown,
  T extends BaseCtrlState<V> = BaseCtrlState<V>
> {
  relation: BaseFormCtrlArgs | null = null;

  updateOnChangeFunc: Function | undefined;

  abstract state: T;

  emitChange() {
    if (typeof this.updateOnChangeFunc == "function") {
      this.updateOnChangeFunc(this.state.value);
    }
  }

  setMode = (mode: CtrlModeType) => {
    this.state.mode = mode;
  };

  setValue = (value: V) => {
    if (this.state.value !== value) {
      this.state.value = value;
      this.emitChange();
    }
  };

  private _key: null | string | number = null;
  private _is_mounted = false;

  get is_mount() {
    return this._is_mounted;
  }

  get key() {
    return this._key;
  }

  set key(key: null | string | number) {
    if (key !== this._key) {
      this._key = key;
      // when the key is change we must to unmount and mount again
      if (this.is_mount) {
        this.unmount();
        this.mount();
      }
    }
  }

  constructor(args: BaseFormCtrlArgs,  key: null | string | number) {
    this.relation = args;
    this.key = key;
  }

  get value(): V | undefined {
    return this.state.value;
  }

  get parent(): mountableCtrl<any> | null {
    const { parent, root } = this.relation as BaseFormCtrlArgs;
    return parent || root;
  }

  // connect to the parent and root
  mount(updateOnChangeFunc?: <T>(value: T) => void) {
    this.updateOnChangeFunc = updateOnChangeFunc;
    const parent = this.parent;
    if (!parent) return;

    parent.mount_children(this);
  }

  // disconnect
  unmount() {
    this.updateOnChangeFunc = undefined;
    const parent = this.parent;
    if (!parent) return;
    parent.unmount_children(this);
  }
}

function createRootCtrl() {
  return new RootCtrl({ parent: null, root: null }, null);
}

export interface mountableCtrl<
  T = unknown,
  S extends BaseCtrlState<T> = BaseCtrlState<T>
> extends BaseFormCtrl<T, S> {
  mount_children(ctrl: BaseFormCtrl<any>): void;
  unmount_children(ctrl: BaseFormCtrl<any>): void;
  update: ((value: T) => void) | ((key: string | number | null, value: T) => void);
}

interface RootCtrlState<T> extends BaseCtrlState<T> {}

export class RootCtrl<T> extends BaseFormCtrl<T, RootCtrlState<T>>
  implements mountableCtrl<T, RootCtrlState<T>> {
  mount_children(ctrl: BaseFormCtrl): void {}

  unmount_children(ctrl: BaseFormCtrl): void {}

  state: RootCtrlState<T> = {
    mode: { mode: ctrlMode.checking, type: null },
    is_err: false,
    dirty: false,
    msgs: {},
    value: undefined
  };

  private _func: { [key: string]: Set<unknown> } = {
    submit: new Set(),
    validation: new Set()
  };

  setMode = (mode: CtrlModeType) => {
    this.state.mode = mode;
  };

  setValue = (value: T) => {
    if (this.state.value !== value) {
      this.state.value = value;
      this.emitChange();
    }
  };

  update(value: T) {
    this.state.value = value;
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
