<template>
  <div class="layout">
    <div class="header">
      <div></div>
      <div class="head-right">
        <div class="user">
          <div class="user-avatar">
            <el-icon-avatar />
          </div>
          <el-dropdown @command="handleUserCommand">
            <div class="user-name">{{ userInfo?.username }}</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="menu"></div>
      <div class="main">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { user: userInfo, clear: clearLocalSession } = useUserSession();

function handlePerson() {
  console.log("personal");
}

function handleLogout() {
  ElMessageBox.confirm("确认退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    autofocus: false,
    type: "warning"
  })
    .then(async () => {
      await clearLocalSession();
      router.push("/login");
    })
    .catch(() => {});
}

function handleUserCommand(cmd: string) {
  switch (cmd) {
    case "person":
      handlePerson();
      break;

    case "logout":
      handleLogout();
      break;

    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  .header {
    padding: 0 16px;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #ccc solid 1px;
    .head-right {
      height: 100%;
      display: flex;
      .user {
        color: #666;
        display: flex;
        align-items: center;
        .user-avatar {
          padding: 2px;
          width: 32px;
          height: 32px;
          overflow: hidden;
          user-select: none;
          border-radius: 16px;
          border: #ccc solid 1px;
        }
        .user-name {
          margin-left: 10px;
          font-size: 14px;
          cursor: pointer;
          &:focus-visible {
            outline: none;
          }
        }
      }
    }
  }
  .container {
    width: 100%;
    height: calc(100vh - 48px);
    display: flex;
    .menu {
      width: 200px;
      height: 100%;
      border-right: #ccc solid 1px;
    }
    .main {
      width: calc(100% - 200px);
      height: 100%;
    }
  }
}
</style>
