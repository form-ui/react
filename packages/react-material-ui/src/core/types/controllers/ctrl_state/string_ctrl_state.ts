import { StringFiledConf } from "../../conf";
import { ctrlMode } from "../ctrl_mode";

export class StringCtrlState {
  constructor(conf: StringFiledConf) {
    // todo
  }

  // todo
  // convert(value:unknown): T {
  //   //switch()
  // }

  props = {};

  input_props = {};

  // the fallowing params derived from both user configuration
  // and the state of this or anther controls
  conf = {
    validationPipes: [],
    default_value: undefined,
    required: false,
    disable: false
  };

  state = {
    mode: { mode: ctrlMode.checking, type: "filed" } as any,
    is_err: false,
    dirty: false,
    msgs: {},
    value: undefined
    // read_view
    //
  };
}
