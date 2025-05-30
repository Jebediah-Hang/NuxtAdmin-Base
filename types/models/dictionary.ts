export interface DictItem {
  value: string;
  label: string;
}

export interface Dictionary extends DictItem {
  id: number;
  category: string;
}

export interface DictCate {
  category: string;
}

export interface DictTypeTree {
  label: string;
  children?: Array<DictTypeTree>;
}
