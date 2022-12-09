import { CheckboxesAttributesType, DropdownAttributesType, FormInfoType, FormItemTypeEnum, InputAttributesType, TextareaAttributesType } from "./form";

export interface PostMeta {
    owner: string;
    name: string;
    title: string;
    body: string;
    labels?: string|string[];
    assignees?: string;
    category?: string;
}

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

export const generateBodyData = (info: FormInfoType, data: any) => {
    const { body } = info;
    if (!body) return '';
    return body.reduce((pre, { type, id, attributes }) =>{
       return  pre += type === FormItemTypeEnum.INPUT ? generateInputString(attributes as InputAttributesType, data[id!]) : type === FormItemTypeEnum.TEXTAREA ? generateTextareaString(attributes as TextareaAttributesType, data[id!]) : type === FormItemTypeEnum.DROPDOWN ? generateDropdownString(attributes as DropdownAttributesType, data[id!]) : type === FormItemTypeEnum.CHECKBOXES ? generateCheckboxesString(attributes as CheckboxesAttributesType, data[id!]) : ''
    }, '');
}

export const generateGitHubIssueURL = ({owner, name, title, body, labels, assignees}:PostMeta) => {
    const labelsString = Array.isArray(labels) ? labels.join(",") : labels;
    const assigneesString = Array.isArray(assignees) ? assignees.join(",") : assignees;
    return `https://github.com/${owner}/${name}/issues/new?` + (new URLSearchParams({
        title,
        body,
        ...(!!labelsString ? {labels: labelsString} : {}),
        ...(!!assigneesString ? {assignees: assigneesString} : {}),
    })).toString();
}

export const generateGitHubDiscussionURL = ({owner, name, title, body, labels, category}:PostMeta) => {
    const labelsString = Array.isArray(labels) ? labels.join(",") : labels;
    return `https://github.com/${owner}/${name}/discussions/new?` + (new URLSearchParams({
        title,
        body,
        ...(!!labelsString ? {labels: labelsString} : {}),
        ...(!!category ? {category} : {})
    })).toString();
}

export const generateGiteeIssueURL = ({owner, name, title, body}:PostMeta) =>
    `https://gitee.com/${owner}/${name}/issues/new?` + (new URLSearchParams({
        'issue[title]': title,
        'issue[description]': body,
    })).toString();
