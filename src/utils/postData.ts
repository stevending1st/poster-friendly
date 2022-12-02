import { FormInfoType } from "./form";





export const generatePostData = (info: FormInfoType, data: any) => {
    const {body} = info;
    if(!body) return '';
    const bodyText = body.reduce((pre, {type, id, attributes, validations}) => {

        return pre;
    }, '')
    console.log("test===>", info, data);
}
