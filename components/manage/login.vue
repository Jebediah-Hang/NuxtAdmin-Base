<template>
  <div class="login-page">
    <div class="login-wapper">
      <div class="login-title">登录</div>
      <el-form>
        <el-form-item>
          <el-input v-model="formDatas.username" placeholder="Input Username">
            <template #prefix>
              <el-icon><el-icon-user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formDatas.password" placeholder="Input Password" show-password>
            <template #prefix>
              <el-icon><el-icon-key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button
          type="primary"
          @click="handleLogin"
        >
          登录
        </el-button>
        <!-- <el-button
          plain
          type="primary"
          @click="handleRegister"
        >
          注册
        </el-button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import crypto from 'crypto-js';
import type { User } from '@/types/models/user';

const emits = defineEmits<{
  loginDone: [];
}>();

const formDatas = ref<Partial<User>>({});

function handleLogin() {
  const loginData: Partial<User> = {
    username: formDatas.value.username,
    password: crypto.MD5(<string>formDatas.value.password).toString()
  };
  $request<string>({
    url: '/api/service/user/login',
    method: 'POST',
    body: loginData
  }).then(res => {
    const { code, data } = res;
    if (code === 200 && data) {
      ElMessage.success('登录成功');
      sessionStorage.setItem(constantVariable.sessionTokenKey, data);
      formDatas.value = {};
      emits('loginDone');
    } else {
      ElMessage.error('登录失败');
    }
  });
}

// function handleRegister() {
//   const registerData: Partial<User> = {
//     username: formDatas.value.username,
//     password: crypto.MD5(<string>formDatas.value.password).toString()
//   };
//   $request({
//     url: '/api/service/user/register',
//     method: 'POST',
//     body: registerData
//   }).then(res => {
//     if (res.code === 200) {
//       ElMessage.success('操作成功');
//       formDatas.value = {};
//     }
//   });
// }

</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background-color: #f1f4fc;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-wapper {
    padding: 30px 80px;
    width: 560px;
    height: 380px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
    .login-title {
      margin-bottom: 40px;
      color: #666;
      font-size: 30px;
      line-height: 60px;
      text-align: center;
      letter-spacing: 16px;
    }
    .btn-group {
      margin-top: 60px;
      text-align: center;
      .el-button {
        width: 32%;
      }
    }
  }
}
</style>
