// import { action } from '@storybook/addon-actions';
// import { Button } from '@storybook/react/demo';
// import { ObjFiledConf, createRootCtrl } from '../core/types';

import React from "react";
import { TextCtrl, NumberCtrl } from '../core/components';
import { Types } from '../core/types/types';
import { useObjForm } from '../core/hooks/useObjForm';
import { FormMonitoring } from './helpers';
import "./style.css"


export default {
  title: 'Form',
};



const formConfig = Types.obj.fields({
  name: Types.string,
  age: Types.number
})

// todo
// show filed configuration


export const Form = () => {
  const { root, fields, value } = useObjForm(formConfig);

  return <FormMonitoring value={value} root={root}>
    <form className="container">
      <label htmlFor="name">
        Name
      </label>
      <TextCtrl ctrl={fields.name}>
        <input id="name" />
      </TextCtrl>

      <label htmlFor="age">
        Age
      </label>
      <NumberCtrl ctrl={fields.age}>
        <input id="age" />
      </NumberCtrl>
    </form>
  </FormMonitoring>
};


