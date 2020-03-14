import { CtrlModeType } from "./ctrl_mode";
import { FieldMessages } from "../common";
import { RootCtrl } from "./root_ctrl";
import { ContainableCtrl, FormCtrl, PartialUpdatableCtrl } from "./traits";
import { CtrlTypes } from "../types";
import { debounce } from "../../utils";

const IS_DEVELOPMENT = process.env?.NODE_ENV === "development";

export interface FormCtrlArgs<R = any, P = any> {
  root: RootCtrl<R> | null;
  parent: (PartialUpdatableCtrl<P> & ContainableCtrl) | null;
}

export interface BaseCtrlState<T> {
  value?: T;
  mode: CtrlModeType;
  is_err: boolean;
  dirty: boolean;
  msgs: FieldMessages;
}


/**
 * Implement the base functions of every controller
 * 
 * @export
 * @abstract
 * @class BaseFormCtrl
 * @implements {FormCtrl<T>}
 * @template T 
 * @template S 
 */
export abstract class BaseFormCtrl<
  T,
  S extends BaseCtrlState<T>
> implements FormCtrl<T> {
  relation: FormCtrlArgs | null = null;

  // saving the update count
  analyses: null | {
    update_count: number;
    last_update?: number;
  } = IS_DEVELOPMENT
    ? {
        update_count: 0,
        last_update: undefined
      }
    : null;

  updateOnChangeFunc: Function | undefined;
  update_mounted: Function | undefined;

  abstract state: S;
  abstract type: CtrlTypes;


  private _debounceUpdate = debounce((value?: T)=> {
    this._update(value);
  }, 500, true);

  public debounceUpdate = (value?: T)=> {
    this.setValue(value);
    this._debounceUpdate(value);
  }


  protected emitChange() {
    if (IS_DEVELOPMENT && this.analyses) {
      this.analyses.update_count++;
      this.analyses.last_update = Date.now();
    }
    if (typeof this.updateOnChangeFunc == "function") {
      this.updateOnChangeFunc(this.state.value);
    }

    if (typeof this.update_mounted == "function") {
      this.update_mounted(this.state.value);
    }
  }

  private _update(value?: T) {
    const parent = this.parent;
    const root = this.root;
    if (parent) {
      parent.updatePartial(this.key, value);
    } else if (root) {
      root.update(value);
    }
  }

  public update = (value?: T) => {
    if (this.state.value !== value) {
     this._update(value)
    }
  };

  public setMode = (mode: CtrlModeType) => {
    this.state.mode = mode;
  };

  public setValue = (value?: T) => {
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
      // when the key is change we must to unmount and mount again. to update the parent
      if (this.is_mount) {
        this.unmount();
        this.mount();
      }
    }
  }

  constructor(args: FormCtrlArgs, key: null | string | number) {
    this.relation = args;
    this.key = key;
  }

  get value(): T | undefined {
    return this.state.value;
  }

  get parent() {
    if (!this.relation) return null;
    const { parent } = this.relation;
    return parent;
  }

  get root() {
    if (!this.relation) return null;
    const { root } = this.relation;
    return root;
  }

  // mount to the either parent or root
  public mount(updateOnChangeFunc?: <T>(value: T) => void) {
    this.updateOnChangeFunc = updateOnChangeFunc;
    const mount_to = this.parent || this.root;
    if (!mount_to) {
      throw new Error("[mount] Can't mount there is no either parent or root");
    }

    mount_to.mount_children(this);
  }

  // disconnect
  public unmount() {
    this.updateOnChangeFunc = undefined;
    const parent = this.parent;
    if (!parent) return;
    parent.unmount_children(this);
  }
}
