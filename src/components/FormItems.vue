<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { FormItemTypeEnum, MarkdownAttributesType, InputAttributesType, TextareaAttributesType, DropdownAttributesType, CheckboxesAttributesType, FormDataType, FormItemType } from '../utils/form';

const { formItem, data } = defineProps<{
    formItem: FormItemType<FormItemTypeEnum>,
    data: FormDataType,
}>()
const markdownIt = new MarkdownIt();
const checkboxesRequired = formItem.type === FormItemTypeEnum.CHECKBOXES && (formItem.attributes as CheckboxesAttributesType).options.some(({ required }) => !!required)
</script>

<template>
    <!--MARKDOWN-->
    <div class="markdown-body github-markdown-render mt-6 mb-1.5!" v-if="formItem.type === FormItemTypeEnum.MARKDOWN"
        v-html="markdownIt.render((formItem.attributes as MarkdownAttributesType).value)" />

    <!--INPUT-->
    <el-form-item class="mt-6 mb-1.5!" v-else-if="formItem.type === FormItemTypeEnum.INPUT"
        :label="(formItem.attributes as InputAttributesType).label" :required="formItem.validations?.required"
        :prop="formItem.id">
        <el-input :placeholder="(formItem.attributes as InputAttributesType)?.placeholder"
            v-model="data[formItem.id!]" />
        <div class="markdown-body github-markdown-render mt-6 mb-1.5!"
            v-if="formItem.type === FormItemTypeEnum.INPUT && (formItem.attributes as InputAttributesType)?.description"
            v-html="markdownIt.render((formItem.attributes as InputAttributesType)?.description || '')" />
    </el-form-item>

    <!--TEXTAREA-->
    <el-form-item class="mt-6 mb-1!" v-else-if="formItem.type === FormItemTypeEnum.TEXTAREA"
        :label="(formItem.attributes as TextareaAttributesType).label" :required="formItem.validations?.required">
        <el-input type="textarea" :placeholder="(formItem.attributes as TextareaAttributesType)?.placeholder"
            v-model="data[formItem.id!]" />
        <div class="markdown-body github-markdown-render mt-6 mb-1.5!"
            v-if="formItem.type === FormItemTypeEnum.TEXTAREA && (formItem.attributes as TextareaAttributesType)?.description"
            v-html="markdownIt.render((formItem.attributes as TextareaAttributesType)?.description || '')" />
    </el-form-item>

    <!--DROPDOWN-->
    <el-form-item class="mt-6 mb-1!" v-else-if="formItem.type === FormItemTypeEnum.DROPDOWN"
        :label="(formItem.attributes as DropdownAttributesType).label" :required="formItem.validations?.required">
        <el-select class="w-full" size="large" :multiple="(formItem.attributes as DropdownAttributesType).multiple"
            v-model="data[formItem.id!]" clearable style="width: 100%">
            <el-option v-for="item in (formItem.attributes as DropdownAttributesType).options" :key="item" :label="item"
                :value="item" />
        </el-select>
        <div class="markdown-body github-markdown-render mt-6 mb-1.5!"
            v-if="formItem.type === FormItemTypeEnum.DROPDOWN && (formItem.attributes as DropdownAttributesType)?.description"
            v-html="markdownIt.render((formItem.attributes as DropdownAttributesType)?.description || '')" />
    </el-form-item>

    <!--CHECKBOXES-->
    <el-form-item class="mt-6 mb-1!" v-else-if="formItem.type === FormItemTypeEnum.CHECKBOXES"
        :label="(formItem.attributes as CheckboxesAttributesType).label" :required="checkboxesRequired">

        <ul class="flex flex-col list-none pl-0 w-full">
            <li v-for="item in (formItem.attributes as CheckboxesAttributesType).options"
                class="flex align-content-center">
                <el-checkbox :key="item.label" class="" :label="item.label" />
                <div class="markdown-body github-markdown-render pl-1 mt-6 mb-1.5!"
                    v-html="markdownIt.render(item.label)" />
            </li>
        </ul>
        <div class="markdown-body github-markdown-render mt-6 mb-1.5!"
            v-if="formItem.type === FormItemTypeEnum.CHECKBOXES && (formItem.attributes as CheckboxesAttributesType)?.description"
            v-html="markdownIt.render((formItem.attributes as CheckboxesAttributesType)?.description || '')" />
    </el-form-item>
</template>

<style scoped>
:deep(.el-form-item__error) {
    position: relative;
    display: block;
}

:deep(.el-checkbox__label) {
    display: none;
}

:deep(label, .el-checkbox) {
    display: flex;
    align-items: stretch;
    margin-top: 0.25rem;
}

:deep(.el-checkbox.el-checkbox--large) {
    height: initial;
}
</style>