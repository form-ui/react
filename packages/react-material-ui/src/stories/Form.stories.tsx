import React from 'react';
// import { action } from '@storybook/addon-actions';
// import { Button } from '@storybook/react/demo';
// import { ObjFiledConf, createRootCtrl } from '../core/types';
import "./Form.css"
import { InputCtrl } from '../core/components';
import { Types } from '../core/types/types';
import { useObjForm } from '../core/hooks/useObjForm';


export default {
  title: 'Form',
};



const formConfig = Types.obj.fields({
  name: Types.string,
  age: Types.number
})

// todo
// show monitoring
// show filed configuration

const ShowValue = <T extends Object>({ value = {} }: { value?: T | Object }) => {
  return <pre className="container" dangerouslySetInnerHTML={
    { __html: JSON.stringify(value, null, 2).replace(/\n/g, "<br />") }
  }></pre>
}

const FormAndResult = ({ value, children }: any) => {
  return <div className="page">
    <div className="half-page" >
      <h2 className="title">Form</h2>
      {children}
    </div>

    <div className="half-page">
      <h2 className="title">Result</h2>
      <ShowValue value={value} />
    </div>
  </div>
}


export const Form = () => {
  const { fields, value } = useObjForm(formConfig);

  console.log("Form render", value);

  return <FormAndResult value={value}>
    <form className="container">
      <label htmlFor="name">Name</label>
      <InputCtrl ctrl={fields.name}>
        <input id="name" />
      </InputCtrl>

      <label htmlFor="age">Age</label>
      <InputCtrl ctrl={fields.age}>
        <input id="age" />
      </InputCtrl>
    </form>
  </FormAndResult>

};


