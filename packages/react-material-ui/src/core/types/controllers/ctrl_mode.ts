
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
