import React from "react";
import { createRootCtrl, ObjFiledConf } from "../types";

export function useObjForm<T extends object>(conf: ObjFiledConf<T>, value?: T) {
  // the main value of the form tree
  const [_value, setValue] = React.useState<T | undefined>(value);

  // the function need to called once, unless the configuration are changed
  const { root, obj, fields } = React.useMemo(() => {
    // create a root controller
    const root = createRootCtrl();
    // create the ctrl from the obj configuration
    const { obj, fields } = conf.createCtrl({ root, parent: null });
    // mount the obj to the root form
    obj.mount((v: any) => setValue(v));

    // return the root ctrl, obj, ctrl and fields controllers as a {[field name]: ctrl}
    return { root, obj, fields };
  }, [conf]);

  React.useEffect(() => {
    obj.setValue(_value);
  }, [obj, _value]);

  React.useEffect(() => {
    return () => obj.unmount();
  }, [obj]);

  return { root, obj, fields, value: _value };
}
