import React from "react";

export const ObjJsonView = <T extends Object>({ value = {} }: { value?: T | Object }) => {
    return <pre className="container" dangerouslySetInnerHTML={
      { __html: JSON.stringify(value, null, 2) }
    }></pre>
  };

  export const ObjCleanJsonView = <T extends Object>({ value = {} }: { value?: T | Object }) => {
    return <pre className="container" dangerouslySetInnerHTML={
      { __html: JSON.stringify(value, null, 2).replace(/\n/g, "<br />") }
    }></pre>
  };