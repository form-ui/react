import { FormCtrl } from "./form_ctrl";



/**
 * ContainableCtrl is FormCtrl that can contains anther FormCtrl 
 * 
 * @export
 * @interface ContainableCtrl
 * @extends {FormCtrl<T>}
 * @template T 
 * @template unknown 
 */
export interface ContainableCtrl<
  T = unknown,
> extends FormCtrl<T> {
  mount_children(ctrl: FormCtrl<any>): void;
  unmount_children(ctrl: FormCtrl<any>): void;
  
}