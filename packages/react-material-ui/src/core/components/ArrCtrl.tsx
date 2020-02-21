import React from "react";


export function useCtrl(ctrl: any) {

}


export function Ctrl({ ctrl, children }: any) {
    // useCtrl(ctrl);

    return typeof children == "function" ?
        children(ctrl) : React.cloneElement(children, {
            value: ctrl.value,
            onChange: ctrl.onChange,
            ctrl
        })
}