<template>
  <div class="manage-view">
    <template v-if="isLogin">
      <el-menu
        active-text-color="#409eff"
        background-color="#16243c"
        text-color="#fff"
        :router="true"
        :default-active="currentPagePath"
      >
        <el-menu-item
          v-for="(item, index) in menuList"
          :key="index"
          :index="item.path"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
        <el-menu-item @click="handleLogout">
          <span>Logout</span>
        </el-menu-item>
      </el-menu>
      <div class="container">
        <NuxtPage />
      </div>
    </template>
    <ManageLogin v-else-if="isLoad" @login-done="getLoginStatus" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const currentPagePath = computed(() => router.currentRoute.value.fullPath);

const menuList = ref([
  { name: 'Dictionary', path: '/manage/dictionary' }
]);

const isLoad = ref(false);
const isLogin = ref(false);
function getLoginStatus() {
  const token = sessionStorage.getItem(constantVariable.sessionTokenKey);
  isLogin.value = Boolean(token);
  isLoad.value = true;
}

function handleLogout() {
  sessionStorage.removeItem(constantVariable.sessionTokenKey);
  location.reload();
}

onMounted(() => {
  getLoginStatus();
});

</script>

<style lang="scss" scoped>
.manage-view {
  width: 100%;
  height: 100vh;
  display: flex;
  .el-menu {
    width: 180px;
  }
  .container {
    padding: 10px 10px 0 10px;
    width: calc(100% - 180px);
    height: 100vh;
    overflow-y: auto;
    background-color: #f1f4fc;
  }
}
</style>
