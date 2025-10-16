import {
  ElInput,
  ElInputNumber,
  ElInputTag,
  ElRadioGroup,
  ElCheckboxGroup,
  ElSelect,
  ElSelectV2,
  ElCascader,
  ElAutocomplete,
  ElColorPicker,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElTreeSelect,
  ElSwitch,
  ElRate,
  ElSlider,
  ElMention,
  ElUpload
} from "element-plus";
import type { Component } from "vue";
import type { ComponentType } from "~~/types/elm";

export const ElmFormComponents: Partial<Record<ComponentType, Component>> = {
  input: ElInput,
  inputNumber: ElInputNumber,
  inputTag: ElInputTag,
  radio: ElRadioGroup,
  checkbox: ElCheckboxGroup,
  select: ElSelect,
  selectV2: ElSelectV2,
  cascader: ElCascader,
  autocomplete: ElAutocomplete,
  colorPicker: ElColorPicker,
  datePicker: ElDatePicker,
  timePicker: ElTimePicker,
  timeSelect: ElTimeSelect,
  treeSelect: ElTreeSelect,
  switch: ElSwitch,
  rate: ElRate,
  slider: ElSlider,
  mention: ElMention,
  upload: ElUpload
};
