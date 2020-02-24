import React from "react";
import { ObjJsonView } from "./ObjView";
import { Monitor } from "./Monitor";


export const FormMonitoring = ({ value, root, children }: any) => {
    
    console.info("Value", value);

    return <div className="page">
      <div className="half-page" >
        <h2 className="title">Form</h2>
        {children}
      </div>
  
      <div className="half-page">
        <h2 className="title">Result</h2>
        <ObjJsonView value={value} />
      </div>
  
      <div className="half-page">
        <h2 className="title">Monitoring</h2>
        <Monitor root={root} />
      </div>
    </div>
  };
  