

export type FiledTypes = string | number | boolean;

export type FieldMessages = { error?: any; wrang?: any; info?: any };
export type ValidationResult = undefined | string | FieldMessages;

export type ValidationFunc<T> = (val: T) => ValidationResult;

