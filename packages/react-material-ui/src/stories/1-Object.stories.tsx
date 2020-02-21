import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ObjFiledConf, createRootCtrl } from '../core/types';
import { InputCtrl } from '../core/components';
import { Types } from '../core/types/types';


export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

type FormObjResult = {
  props: any,
  value: object
}

function useFormObj<T extends object>(conf: ObjFiledConf<T>, value?: T) {
  const [_value, setValue] = React.useState(value);

  const {root, obj} =  React.useMemo(() => {
    const root = createRootCtrl();
    const obj =  conf.createCtrl({root});
    obj.mount();
    return {root, obj}
  }, [conf]);

  React.useEffect(()=>{
    obj.set(_value);
  },[obj, _value]);

  React.useEffect(()=>{
    return () => obj.unmount()
  },[obj])

 


  return {root, obj}

}
 
const formConfig = Types.obj.fileds({
  name: Types.string,
  age: Types.number
}) 



export const Form = () => {
  const { obj: {fields}, root } = useFormObj(formConfig);

  return <form>
  <label htmlFor="name"></label>
  <InputCtrl ctrl={fields.name}>
    <input  />
  </InputCtrl>

    <label htmlFor="age"></label>
    <InputCtrl ctrl={fields.name}>
      <input  />
    </InputCtrl>

  </form>

};
