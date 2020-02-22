
/**
 * The base FormCtrl ship
 * 
 * @export
 * @interface FormCtrl
 * @template T 
 */
export interface FormCtrl<T = unknown> {
    key: null | string | number;
    value: T | undefined;
    mount(updateOnChangeFunc?: <T>(value: T) => void): void;
    
    /**
     * setValue means change your value 
     * 
     * 
     * @memberOf FormCtrl
     */
    setValue: (value?: T) => void;
    unmount(): void;

    /**
     * update means update someone that your value need to be change in contrast to 'setValue'
     * 
     * 
     * @memberOf FormCtrl
     */
    update: (value?: T) => void
  }