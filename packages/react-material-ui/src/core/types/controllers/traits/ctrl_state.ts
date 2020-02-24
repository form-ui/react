type inputTypesString =
  | "text"
  | "number"
  | "checkbox"
  | "color"
  | "date"
  | "email"
  | "file"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "week";

enum inputTypes {
  text = "text",
  number = "number",
  checkbox = "checkbox",
  color = "color",
  date = "date",
  email = "email",
  file = "file",
  password = "password",
  radio = "radio",
  range = "range",
  reset = "reset",
  search = "search",
  tel = "tel",
  time = "time",
  url = "url",
  week = "week"
}

/**
 * Represent the shap of the general state
 *
 * @export
 * @interface CtrlState
 */
export interface CtrlState<T = unknown> {
  value?: T;
  // update on any change in the status
  onChange(func: (args: any) => void): void;
  // convert any possible value to state Type
  convert(v: unknown): undefined | T;
  getInputProps(input_type: inputTypesString | inputTypes): any;
}
