import React, { useCallback } from "react";
import { FiledCtrl, FormCtrl } from "../types/controllers";
import { useCtrl } from "../hooks";


const wrapOnChange = (change: (val: any) => void) =>
    (event: any) => {
        let value: any = event;
        if (event && event?.target instanceof HTMLInputElement) {
            value = event.target?.value;
        }
        change(value);
    }




export function InputCtrl<T extends FormCtrl<any>>({ ctrl, children }: { children: any, ctrl: T }) {
    // todo create default value if value is undefined
    const value = useCtrl(ctrl) || "";
    const input_type = "text";
    const onChange = useCallback(wrapOnChange(ctrl.update), [ctrl.setValue]);

    return typeof children == "function" ?
        children(ctrl) : React.cloneElement(children, {
            value,
            type: input_type,
            onChange,
            name: ctrl.key
        })
}