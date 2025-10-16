<template>
  <el-form ref="form" v-bind="elFormProps" :model="formDatas" @validate="onValidate">
    <el-row v-bind="props.layout">
      <template v-for="(column, key) in formColumns" :key="key">
        <el-col v-if="column?.display !== false" :span="column?.span" v-bind="column?.layout">
          <el-form-item :prop="key" v-bind="elFormItemProps(column)">
            <template #label>
              <slot :name="`${key}${formLabelSlotSuffix}`" :column="column"></slot>
            </template>
            <template #error>
              <slot :name="`${key}${formErrorSlotSuffix}`" :column="column"></slot>
            </template>
            <slot :name="key" :column="<ElmFormColumn>column">
              <component
                v-if="column?.type"
                :is="ElmFormComponents[column.type]"
                v-model="formDatas[key]"
                v-bind="column.attrs"
                v-on="column.emits || {}"
              />
              <el-input
                v-else
                v-bind="<InputProps>column?.attrs"
                v-on="<InputEmits>column?.emits || {}"
              />
            </slot>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { omit } from "lodash-es";
import type {
  FormProps,
  FormItemProp,
  FormValidateCallback,
  RowProps,
  InputProps,
  InputEmits
} from "element-plus";
import type { ElmFormSlotNode, ElmFormColumn, ElmFormColumnOptions } from "~~/types/elm";

const formLabelSlotSuffix = "_label" as const;
const formErrorSlotSuffix = "_error" as const;

type ElmFormSlots<T> = {
  [K in keyof T]: ElmFormSlotNode;
} & {
  [K in keyof T as `${Exclude<K, symbol>}${
    | typeof formLabelSlotSuffix
    | typeof formErrorSlotSuffix}`]: ElmFormSlotNode;
} & {
  [key: string]: ElmFormSlotNode;
};

interface ElmFormProps<T = any> extends /* @vue-ignore */ Partial<Omit<FormProps, "model">> {
  columns: ElmFormColumnOptions<T>;
  layout?: Partial<RowProps>;
}

const slots = defineSlots<ElmFormSlots<T>>();
const props = defineProps<ElmFormProps<T>>();

const emits = defineEmits<{
  validate: [prop: FormItemProp, isValid: boolean, message: string];
}>();

const formDatas = defineModel<T>({ required: true, default: () => ({}) });

const formRef = useTemplateRef("form");
const formColumns = computed(() => props.columns || {});

const elFormProps = computed(() => omit(props, ["columns", "layout", "modelValue"]));
const elFormItemProps = (column?: ElmFormColumn) => {
  return column ? omit(column, ["type", "attrs", "emits", "layout", "display", "span"]) : {};
};

function onValidate(prop: FormItemProp, isValid: boolean, message: string) {
  emits("validate", prop, isValid, message);
}

function validate(callback?: FormValidateCallback) {
  return formRef.value?.validate(callback);
}
function validateField(props?: FormItemProp, callback?: FormValidateCallback) {
  return formRef.value?.validateField(props, callback);
}
function clearValidate(props?: FormItemProp) {
  return formRef.value?.clearValidate(props);
}
function resetFields(props?: FormItemProp) {
  return formRef.value?.resetFields(props);
}
function scrollToField(prop: FormItemProp) {
  return formRef.value?.scrollToField(prop);
}

defineExpose({
  formRef,
  validate,
  validateField,
  clearValidate,
  resetFields,
  scrollToField
});
</script>
