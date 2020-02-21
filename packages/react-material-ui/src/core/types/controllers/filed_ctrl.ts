import { BaseFormCtrl, BaseCtrlState, ctrlMode } from "./root_ctrl";

interface FiledCtrlState<T> extends BaseCtrlState<T> {

}

export class FiledCtrl<T> extends BaseFormCtrl<FiledCtrlState<T>> {
    state = {
        mode: { mode: ctrlMode.checking, type: "filed" } as any,
        is_err: false,
        dirty: false,
        msgs: {},
        value: undefined
      };

  //_debounce_on_change = deb;

}