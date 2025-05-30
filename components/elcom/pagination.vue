<template>
  <div class="table-pager">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :pager-count="5"
      :total="pager.total"
      v-model:page-size="pager.pageSize"
      v-model:current-page="pager.currentPage"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
const pager = defineModel<ElcomPaginationPager>({
  required: true,
  default: () => ({
    total: 0,
    pageSize: 10,
    currentPage: 1
  })
});

const emits = defineEmits<{
  change: [pager: ElcomPaginationPager];
}>();

function onSizeChange() {
  pager.value.currentPage = 1;
  emits('change', pager.value);
}
function onCurrentChange() {
  emits('change', pager.value);
}

</script>

<style lang="scss" scoped>
.table-pager {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>