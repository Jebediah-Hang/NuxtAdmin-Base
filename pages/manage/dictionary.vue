<template>
  <div class="manage-page">
    <div class="left-type">
      <el-tree
        ref="typeTree"
        highlight-current
        default-expand-all
        node-key="label"
        :expand-on-click-node="false"
        :data="typeTreeData"
        @node-click="handleTypeClick"
      ></el-tree>
    </div>
    <div class="right-table">
      <div class="table-menu">
        <el-button @click="handleAdd">添加</el-button>
        <el-button :disabled="!selectionList.length" @click="batchDelete">删除</el-button>
        <el-button @click="getTableData">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="60" />
        <el-table-column
          v-for="(label, prop) in tableColumn"
          :prop="prop"
          :label="label"
        ></el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ElcomPagination
        v-model="pager"
        @change="getTableData"
      />
    </div>
  </div>
  <ManageDictionaryEditor
    v-model="editDialog"
    :edit-data="editData"
    @success="getTableData"
  />
</template>

<script setup lang="ts">
import type { DictTypeTree, Dictionary } from '@/types/models/dictionary';

const typeTreeData = computed(() => [typeSourceData.value]);
const typeSourceData = ref<DictTypeTree>({ label: '全部', children: [] });
function getTypeData() {
  $request<Array<string>>({
    url: '/api/service/dictionary/category/list',
    method: 'GET'
  }).then(res => {
    const { code, data } = res;
    if (code === 200 && Array.isArray(data)) {
      typeSourceData.value.children = data.map(label => ({ label }));
      nextTick(() => {
        if (checkedType.value !== '全部' && data.includes(checkedType.value)) {
          typeTree.value?.setCurrentKey(checkedType.value);
        } else {
          typeTree.value?.setCurrentKey('全部');
        }
      });
    }
  });
}

const typeTree = useTemplateRef('typeTree');
const checkedType = ref<string>('全部');
function handleTypeClick(node: { label: string; }) {
  checkedType.value = node.label;
  getTableData();
}

const tableColumn = ref<ElcomTableColumnConfig<Dictionary>>({
  category: '类别',
  value: '字典值',
  label: '字典名'
});
const pager = ref<ElcomPaginationPager>({
  total: 0,
  pageSize: 10,
  currentPage: 1
});

const tableData = ref<Array<Dictionary>>([]);
function getTableData() {
  const queryParams: ApiPageQuery<Dictionary> = {
    category: checkedType.value === '全部' ? '' : checkedType.value,
    current: pager.value.currentPage,
    size: pager.value.pageSize
  };
  $request<ApiPageList<Dictionary>>({
    url: '/api/service/dictionary/dict/page',
    method: 'GET',
    params: queryParams
  }).then(res => {
    const { code, data } = res;
    if (code === 200 && data) {
      tableData.value = data.list;
      pager.value.total = data.total;
    }
  })
}

const selectionList = ref<Array<Dictionary>>([]);
function onSelectionChange(list: Array<Dictionary>) {
  selectionList.value = list;
}

const editData = ref<Dictionary | null>(null);
const editDialog = ref(false);
function handleAdd() {
  editData.value = null;
  editDialog.value = true;
}
function handleEdit(row: Dictionary) {
  editData.value = row;
  editDialog.value = true;
}

function batchDelete() {
  const ids = selectionList.value.map(item => item.id);
  handleDelete(ids.join(','));
}
function handleDelete(ids: string) {
  ElMessageBox.confirm('确定删除？', '提示', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定'
  }).then(() => {
    $request({
      url: '/api/service/dictionary/dict/delete',
      method: 'GET',
      params: { ids }
    }).then(res => {
      if (res.code === 200) {
        ElMessage.success('操作成功');
        getTableData();
      }
    });
  }).catch(() => {});
}

onMounted(() => {
  getTypeData();
  getTableData();
})
</script>

<style lang="scss" scoped>
.manage-page {
  padding: 10px;
  width: 100%;
  min-height: 100%;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  .left-type {
    padding-right: 10px;
    width: 180px;
    border-right: #ccc solid 1px;
  }
  .right-table {
    padding-left: 10px;
    width: calc(100% - 180px);
    .table-menu {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
