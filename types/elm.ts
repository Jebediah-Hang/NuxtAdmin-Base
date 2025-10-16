import type { Slot } from "vue";
import type {
  ColProps,
  FormItemProps,
  InputProps,
  InputEmits,
  InputNumberProps,
  InputNumberEmits,
  InputTagProps,
  InputTagEmits,
  RadioGroupProps,
  RadioGroupEmits,
  CheckboxGroupProps,
  CheckboxGroupEmits,
  SelectProps,
  selectEmits,
  SelectV2Props,
  CascaderInstance,
  CascaderEmits,
  AutocompleteProps,
  AutocompleteEmits,
  ColorPickerProps,
  ColorPickerEmits,
  DatePickerProps,
  TimePickerDefaultProps,
  TimeSelectProps,
  TreeComponentProps,
  SwitchProps,
  SwitchEmits,
  RateProps,
  RateEmits,
  SliderProps,
  SliderEmits,
  MentionProps,
  MentionEmits,
  UploadProps
} from "element-plus";

export type ElmFormSlotNode = Slot<{ column: ComponentOption<ComponentType, any, any> }>;

interface FormComponentCommonEmits {
  clear: () => void;
  change: (val: any) => void;
  blur: (evt: FocusEvent) => void;
  focus: (evt: FocusEvent) => void;
}

type EmitsHandlers<T, R = void> = {
  [K in keyof T]?: T[K] extends (...args: infer P) => any ? (...args: P) => R : never;
};

export type ComponentType =
  | "input"
  | "inputNumber"
  | "inputTag"
  | "radio"
  | "checkbox"
  | "select"
  | "selectV2"
  | "cascader"
  | "autocomplete"
  | "colorPicker"
  | "datePicker"
  | "timePicker"
  | "timeSelect"
  | "treeSelect"
  | "switch"
  | "rate"
  | "slider"
  | "mention"
  | "upload";

interface ComponentOption<T extends ComponentType, A, E>
  extends Partial<Omit<FormItemProps, "prop">> {
  type?: T;
  attrs?: Partial<A>;
  emits?: EmitsHandlers<E>;
  layout?: Partial<ColProps>;
  display?: boolean;
  span?: number;
}

export type ElmFormColumn =
  | ComponentOption<"input", InputProps, InputEmits>
  | ComponentOption<"inputNumber", InputNumberProps, InputNumberEmits>
  | ComponentOption<"inputTag", InputTagProps, InputTagEmits>
  | ComponentOption<"radio", RadioGroupProps, RadioGroupEmits>
  | ComponentOption<"checkbox", CheckboxGroupProps, CheckboxGroupEmits>
  | ComponentOption<"select", SelectProps, typeof selectEmits>
  | ComponentOption<"selectV2", SelectV2Props, typeof selectEmits>
  | ComponentOption<"cascader", CascaderInstance["$props"], CascaderEmits>
  | ComponentOption<"autocomplete", AutocompleteProps, AutocompleteEmits>
  | ComponentOption<"colorPicker", ColorPickerProps, ColorPickerEmits>
  | ComponentOption<"datePicker", DatePickerProps, FormComponentCommonEmits>
  | ComponentOption<"timePicker", TimePickerDefaultProps, FormComponentCommonEmits>
  | ComponentOption<"timeSelect", TimeSelectProps, FormComponentCommonEmits>
  | ComponentOption<"treeSelect", SelectProps & TreeComponentProps, FormComponentCommonEmits>
  | ComponentOption<"switch", SwitchProps, SwitchEmits>
  | ComponentOption<"rate", RateProps, RateEmits>
  | ComponentOption<"slider", SliderProps, SliderEmits>
  | ComponentOption<"mention", MentionProps, MentionEmits>
  | ComponentOption<"upload", UploadProps, {}>;

export type ElmFormColumnOptions<T = any> =
  | Partial<Record<keyof T, ElmFormColumn>>
  | Record<string, ElmFormColumn>;
