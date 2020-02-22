import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ObjFiledConf, createRootCtrl } from '../core/types';
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

export const Form = () => {
  const { fields , value } = useObjForm(formConfig);

  console.log("Form render", value);

  return <form>
    <label htmlFor="name"></label>
    <InputCtrl ctrl={fields.name}>
      <input id="name" />
    </InputCtrl>

    <label htmlFor="age"></label>
    <InputCtrl ctrl={fields.age}>
      <input id="age" />
    </InputCtrl>
  </form>
};
