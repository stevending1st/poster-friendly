import { CheckboxesAttributesType, DropdownAttributesType, FormInfoType, FormItemType, FormItemTypeEnum, InputAttributesType, TextareaAttributesType } from "./form";

export const generateInputString = ({ label }: InputAttributesType, value?: string) =>
    `### ${label}\n\n${value ? value : '_No response_'}\n\n`;

export const generateTextareaString = ({ label }: TextareaAttributesType, value?: string) =>
    `### ${label}\n\n${value ? value : '_No response_'}\n\n`;

export const generateDropdownString = ({ label }: DropdownAttributesType, value?: string[] | string) =>
    `### ${label}\n\n${value ?  Array.isArray(value) ? value.join(',') : value : '_No response_'}\n\n`;

export const generateCheckboxesString = ({ label, options }: CheckboxesAttributesType, value?: string[]) => {
    const content = options.reduce((pre, { label }, index) =>
        pre += `\n- [${value?.[index] ? 'x' : ' '}] ${label}`
        , '')
    return `### ${label}\n${content}\n\n`;
}

export const generatePostData = (info: FormInfoType, data: any) => {
    const { body } = info;
    if (!body) return '';
    const bodyText = body.reduce((pre, { type, id, attributes }) =>{
       return  pre += type === FormItemTypeEnum.INPUT ? generateInputString(attributes as InputAttributesType, data[id!]) : type === FormItemTypeEnum.TEXTAREA ? generateTextareaString(attributes as TextareaAttributesType, data[id!]) : type === FormItemTypeEnum.DROPDOWN ? generateDropdownString(attributes as DropdownAttributesType, data[id!]) : type === FormItemTypeEnum.CHECKBOXES ? generateCheckboxesString(attributes as CheckboxesAttributesType, data[id!]) : ''
    }, '')
}
