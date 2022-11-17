import { FormItemRule, FormRules } from 'element-plus';
import MarkdownIt from 'markdown-it';
import { v4 as uuidv4 } from 'uuid';

export enum FormItemTypeEnum {
    MARKDOWN = "markdown",
    INPUT = "input",
    TEXTAREA = "textarea",
    DROPDOWN = "dropdown",
    CHECKBOXES = "checkboxes",
}

export interface ValidationsType {
    required: boolean;
}

export interface CheckboxesOptionalType {
    label: string;
    required?: boolean;
}

export interface MarkdownAttributesType {
    value: string;
}

export interface InputAttributesType {
    label: string;
    description?: string;
    placeholder?: string;
    value?: string;
}

export interface TextareaAttributesType {
    label: string;
    description?: string;
    placeholder?: string;
    value?: string;
    render?: string;
}

export interface DropdownAttributesType {
    label: string;
    options: string[];
    description?: string;
    multiple?: boolean;
}

export interface CheckboxesAttributesType {
    label: string;
    options: CheckboxesOptionalType[];
    description?: string;
}

export interface FormItemType {
    type: FormItemTypeEnum;
    id?: string;
    attributes: MarkdownAttributesType | InputAttributesType | TextareaAttributesType |DropdownAttributesType|CheckboxesAttributesType;
        // T extends FormItemTypeEnum.INPUT ? InputAttributesType :
        // T extends FormItemTypeEnum.TEXTAREA ? TextareaAttributesType :
        // T extends FormItemTypeEnum.DROPDOWN ? DropdownAttributesType :
        // T extends FormItemTypeEnum.CHECKBOXES ? CheckboxesAttributesType :
        // MarkdownAttributesType;
    validations?: ValidationsType;
}

export interface FormInfoType {
    name: string;
    description: string;
    assignees?: string | string[];
    labels?: string | string[];
    title?: string;
    body?: FormItemType[];
}

export interface FormDataType {
    [key: string]: any;
}

export const getFormItemAndData = (formInfo: FormInfoType) => {
    const markdownIt = new MarkdownIt();
    const {body, ...other} = formInfo;

    if(!body) {
        return [{body, ...other}, {}, {}]
    }

    const [rules, data] = body.reduce<[FormRules, FormDataType]>((pre, {type, id, attributes, validations}, index, arr)=> {
        if(type === FormItemTypeEnum.MARKDOWN) return pre;
        if(!id) {
            const uuid = uuidv4();
            arr[index].id = uuid;
        }
        const key = arr[index].id!;
        let [rules, data] = pre;
        // data
        if(type === FormItemTypeEnum.INPUT || type === FormItemTypeEnum.TEXTAREA){
            data = {...data, [key]: (attributes as (InputAttributesType | TextareaAttributesType))?.value ||''};
        } else if(type === FormItemTypeEnum.DROPDOWN ) {
            data = {...data, [key]: (attributes as DropdownAttributesType).multiple ? '' : []};
        } else if(type === FormItemTypeEnum.CHECKBOXES ) {
            data = {...data, [key]: []};
        }
        // rules
        if(type !== FormItemTypeEnum.CHECKBOXES && validations?.required){
            rules = {...rules, [key]: [{
                type: type === FormItemTypeEnum.DROPDOWN ? 'array' : 'string',
                required: true,
                message: 'This is required.',
                trigger: type === FormItemTypeEnum.DROPDOWN ? 'change' : 'blur',
                validator: undefined
            }] as FormItemRule }
        }
        if(type === FormItemTypeEnum.CHECKBOXES){
            const requiredItemsArr = (attributes as CheckboxesAttributesType).options.filter(({required}) => !!required).map(({label}) => label);
            const message = "You should select:" + requiredItemsArr.map(items => markdownIt.render(items)).join("");
            const validator = requiredItemsArr.length <= 0 ? undefined : (rule: FormItemRule, value: string[]) => {
                const hasWrongFields = requiredItemsArr.length > value.length || requiredItemsArr.some(items => !value.includes(items));
                if(hasWrongFields) {
                    return new Error();
                }
            }
            rules = {...rules, [key]: [{
                type: 'array',
                required: requiredItemsArr.length > 0,
                message,
                trigger: 'change',
                validator,
            }] as FormItemRule };
        }
        return [rules, data];
    }, [{}, {}])
    return [{body, ...other}, rules , data];
}
