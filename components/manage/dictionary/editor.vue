<template>
  <el-dialog
    width="500"
    :title="isEdit ? '编辑' : '新增'"
    v-model="dialogStatus"
  >
    <el-form
      label-suffix=":"
      label-width="100"
      :model="formDatas"
    >
      <el-form-item label="类别">
        <el-select
          filterable
          allow-create
          v-model="formDatas.category"
        >
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典值">
        <el-input v-model="formDatas.value" />
      </el-form-item>
      <el-form-item label="字典名">
        <el-input v-model="formDatas.label" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es';
import type { Dictionary } from '@/types/models/dictionary';

const dialogStatus = defineModel({ required: true, default: false });
const props = defineProps<{
  editData: Dictionary | null;
}>();
const emits = defineEmits<{
  success: [];
}>();

const isEdit = computed(() => Boolean(props.editData));

watch(dialogStatus, (val) => {
  if (val) {
    getTypeData();
    if (isEdit.value) {
      formDatas.value = cloneDeep(<Dictionary>props.editData);
    }
  } else {
    formDatas.value = {};
  }
});

const formDatas = ref<Partial<Dictionary>>({});

const typeList = ref<Array<string>>([]);
function getTypeData() {
  $request<Array<string>>({
    url: '/api/service/dictionary/category/list',
    method: 'GET'
  }).then(res => {
    const { code, data } = res;
    if (code === 200 && Array.isArray(data)) {
      typeList.value = data;
    }
  });
}

function handleConfirm() {
  $request({
    url: '/api/service/dictionary/dict/save',
    method: 'POST',
    body: formDatas.value
  }).then(res => {
    if (res.code === 200) {
      ElMessage.success('操作成功');
      emits('success');
      handleClose();
    }
  });
}
function handleClose() {
  dialogStatus.value = false;
}
</script>

<style lang="scss" scoped>
</style>
