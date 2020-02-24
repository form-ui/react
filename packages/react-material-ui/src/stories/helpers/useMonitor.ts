import {
  CtrlTypes,
  ObjCtrl,
  RootCtrl,
  FormCtrl,
  FiledCtrl
} from "../../core/types";
import { ArrayCtrl } from "../../core/types/controllers/array_ctrl";
import { useEffect, useState } from "react";

function calcUpdateTime(root: RootCtrl<unknown>) {
  return root.form_data_ctrl ? handle(root.form_data_ctrl) : {};

  function handle(params: FormCtrl) {
    switch (params.type) {
      case CtrlTypes.Obj:
        return handleObj(params as ObjCtrl<any>);
      case CtrlTypes.Array:
        return handleArray(params as ArrayCtrl<any>);
      case CtrlTypes.Field:
        return handleFiled(params as FiledCtrl<any>);
      default:
        throw new Error("Type can't be root in this function");
    }
  }
  function handleObj(params: ObjCtrl<any>) {
    if (!params.analyses) return;
    const v: any = {
      type: CtrlTypes.Obj,
      ...formatAnalyses(params.analyses),
      fields: {}
    };
    for (const [key, ctrl] of Array.from(params._children)) {
      v.fields[key] = handle(ctrl);
    }
    return v;
  }

  function handleArray(params: ArrayCtrl<any>) {
    // todo
    // if (!params.analyses) return
    // const v: any = { type: CtrlTypes.Array,...formatAnalyses(params.analyses), items: {} };
    // for (const [key, ctrl] of Array.from(params._children)) {
    //   v.fields[key] = handle(ctrl);
    // }
    // return v;
  }

  function handleFiled(params: FiledCtrl<unknown>) {
    return { type: CtrlTypes.Field, ...formatAnalyses(params.analyses) };
  }

  function formatAnalyses(a: any) {
    let last_update;
    if (a.last_update) {
      last_update = new Date(a.last_update).toLocaleTimeString();
    }
    return {
      ...a,
      last_update
    };
  }
}

export function useMonitor(root: RootCtrl<unknown>) {
  const [value, setValue] = useState({});
  useEffect(() => {
    root.updateOnChangeFunc = () => {
      setTimeout(() => {
        setValue(calcUpdateTime(root));
      }, 0);
    };
    return () => (root.updateOnChangeFunc = undefined);
  }, [root]);
  return value;
}
