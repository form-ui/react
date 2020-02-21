import React, { useCallback } from "react";
import { FiledCtrl } from "../types/controllers";


const wrapOnChange = (change: (val: any) => void) =>
    (event: any) => {
        let value: any = event;
        if (event && event?.target instanceof HTMLInputElement) {
            value = event.target?.value || event;
        }
        change(value);
    }

export function useCtrl(ctrl: any) {
    const [value, setValue] = React.useState(ctrl.value);

    React.useEffect(() => {
        ctrl.mount((value: unknown) => setValue(value));
        return () => {
            ctrl.unmount();
        };
    }, [ctrl]);
    return value;
}


export function InputCtrl({ ctrl, children }: { children: any, ctrl: FiledCtrl<string | number | boolean> }) {

    const value = useCtrl(ctrl);
    const onChange = useCallback(wrapOnChange(ctrl.setValue), [ctrl.setValue]);

    return typeof children == "function" ?
        children(ctrl) : React.cloneElement(children, {
            value,
            onChange,
            name: ctrl.key
        })
}