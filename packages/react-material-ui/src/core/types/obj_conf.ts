import { FiledConf, FiledConfData, ValidationFunc, BaseFormCtrl } from "./common";
import { FormTypes } from "./types";
import { RootCtrl } from "./root_ctrl";
import { ObjCtrl } from "./obj_ctrl";

type ObjConfData<T extends object> = FiledConfData<T> & {
    fields: {
        [key: string]: FiledConf<any, ObjConfData<T>>
    },
    validationPipes: ValidationFunc<T>[]
}

export class ObjFiledConf<T extends object = object> extends FiledConf<T ,ObjConfData<T>> {
    data = {
        type: FormTypes.object,
        title: "",
        fields: {},
        validationPipes: []
    }

    createCtrl({root, parent}: {root: RootCtrl<any>, parent?:BaseFormCtrl<any>} ) {
        const obj_ctrl =  new ObjCtrl({root, parent});
        
    }
}