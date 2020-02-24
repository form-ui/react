import { ObjJsonView } from "./ObjView"
import { useMonitor } from "./useMonitor"
import React from "react";
import { RootCtrl } from "../../core/types";


export const Monitor = React.memo(({ root }: { root: RootCtrl<unknown> }) => {
  const value = useMonitor(root)
  console.info("Monitor", value);
  return <ObjJsonView value={value} />
});
