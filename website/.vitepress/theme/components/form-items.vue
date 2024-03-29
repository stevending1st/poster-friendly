<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import {
  FormItemTypeEnum,
  MarkdownAttributesType,
  InputAttributesType,
  TextareaAttributesType,
  DropdownAttributesType,
  CheckboxesAttributesType,
  FormDataType,
  FormItemType,
} from '../../utils/form';

const { formItem, data } = defineProps<{
  formItem: FormItemType<FormItemTypeEnum>;
  data: FormDataType;
}>();
const markdownIt = new MarkdownIt();
</script>

<template>
  <div>
    <!--MARKDOWN-->
    <div
      class="markdown-body mb-1.5!"
      v-if="formItem.type === FormItemTypeEnum.MARKDOWN"
      v-html="markdownIt.render((formItem.attributes as MarkdownAttributesType).value)"
    />

    <!--INPUT-->
    <el-form-item
      class="mt-6 mb-1.5!"
      v-else-if="formItem.type === FormItemTypeEnum.INPUT"
      :label="(formItem.attributes as InputAttributesType).label"
      :required="formItem.validations?.required"
      :prop="formItem.id"
    >
      <div
        class="markdown-body mb-1.5!"
        v-if="formItem.type === FormItemTypeEnum.INPUT && (formItem.attributes as InputAttributesType)?.description"
        v-html="markdownIt.render((formItem.attributes as InputAttributesType)?.description || '')"
      />
      <el-input
        :placeholder="(formItem.attributes as InputAttributesType)?.placeholder"
        v-model="data[formItem.id!]"
      />
    </el-form-item>

    <!--TEXTAREA-->
    <el-form-item
      class="mt-6 mb-1!"
      v-else-if="formItem.type === FormItemTypeEnum.TEXTAREA"
      :label="(formItem.attributes as TextareaAttributesType).label"
      :required="formItem.validations?.required"
      :prop="formItem.id"
    >
      <div
        class="markdown-body mb-1.5!"
        v-if="formItem.type === FormItemTypeEnum.TEXTAREA && (formItem.attributes as TextareaAttributesType)?.description"
        v-html="markdownIt.render((formItem.attributes as TextareaAttributesType)?.description || '')"
      />
      <el-input
        type="textarea"
        :placeholder="(formItem.attributes as TextareaAttributesType)?.placeholder"
        v-model="data[formItem.id!]"
      />
    </el-form-item>

    <!--DROPDOWN-->
    <el-form-item
      class="mt-6 mb-1!"
      v-else-if="formItem.type === FormItemTypeEnum.DROPDOWN"
      :label="(formItem.attributes as DropdownAttributesType).label"
      :required="formItem.validations?.required"
      :prop="formItem.id"
    >
      <div
        class="markdown-body mb-1.5!"
        v-if="formItem.type === FormItemTypeEnum.DROPDOWN && (formItem.attributes as DropdownAttributesType)?.description"
        v-html="markdownIt.render((formItem.attributes as DropdownAttributesType)?.description || '')"
      />

      <el-select
        class="w-full"
        size="large"
        :multiple="(formItem.attributes as DropdownAttributesType).multiple"
        v-model="data[formItem.id!]"
        clearable
        style="width: 100%"
      >
        <el-option
          v-for="item in (formItem.attributes as DropdownAttributesType).options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!--CHECKBOXES-->
    <el-form-item
      class="mt-6 mb-1!"
      v-else-if="formItem.type === FormItemTypeEnum.CHECKBOXES"
      :label="(formItem.attributes as CheckboxesAttributesType).label"
    >
      <div
        class="markdown-body mb-1.5!"
        v-if="formItem.type === FormItemTypeEnum.CHECKBOXES && (formItem.attributes as CheckboxesAttributesType)?.description"
        v-html="markdownIt.render((formItem.attributes as CheckboxesAttributesType)?.description || '')"
      />

      <ul class="flex flex-col list-none pl-0 w-full">
        <el-form-item
          v-for="item, index in (formItem.attributes as CheckboxesAttributesType).options"
          :prop="`[${formItem.id}][${index}]`"
          :key="item.label"
        >
          <div class="flex align-content-center">
            <el-checkbox
              :label="item.label"
              v-model="(data[formItem.id as string] as string[])[index]"
            />
            <div class="w-8px!">
              <div
                class="i-carbon-asterisk color-#f56c6c mt-1 text-2 font-600"
                v-if="item.required"
              />
              <div class="mt-1 ml-3 text-2" v-else />
            </div>
            <div
              class="markdown-body pl-1"
              v-html="markdownIt.render(item.label)"
            />
          </div>
        </el-form-item>
      </ul>
    </el-form-item>
  </div>
</template>

<style scoped>
:deep(.el-form-item__error) {
  position: relative;
  display: block;
  margin-bottom: 1rem;
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

.markdown-body {
  word-break: break-word !important;
  background-color: inherit !important;
  color: inherit !important;
}
</style>
