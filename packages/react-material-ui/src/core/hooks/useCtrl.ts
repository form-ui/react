import React from "react";
import { FormCtrl } from "../types";

// register to mount and unmount of the controller and update every time a value every time the
export function useCtrl(ctrl: FormCtrl<any>) {
  const [value, setValue] = React.useState(ctrl.value);

  React.useEffect(() => {
    ctrl.mount((value: unknown) => {
      setValue(value);
    });
    return () => {
      ctrl.unmount();
    };
  }, [ctrl]);
  return value;
}
