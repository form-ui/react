import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { ObjFiledConf } from '../core/types/obj_conf';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

type FormObjResult = {
  props: any,
  value: object
}

function useFormObj<T extends object>(conf: ObjFiledConf<T>, value?: T = {} as T) {
  const [obj, val] = React.useState(value)

  return React.useMemo(() => {
    const root = createRootCtrl();
    const conf.createCtrl({root});
   
  }, [conf])

}

export const Form = () => {
  const { fileds, conf } = useFormObj()
  return <form>
    <label htmlFor="name"></label>
    <input {..form.name} ></input>

    <label htmlFor="name"></label>
    <input {..form.age} ></input>

  </form>

};
