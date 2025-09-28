<template>
  <div class="test-page">
    <div>Page Index</div>
    <div>
      <button @click="requestTest">test</button>
    </div>
    <div>
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
      <!-- <button @click="register">Register</button> -->
    </div>
    <div>loggedIn: {{ loggedIn }}</div>
    <div>user: {{ user }}</div>
    <div>token: {{ session?.token }}</div>
    <div>expTime: {{ session?.expiredTime }}</div>
  </div>
</template>

<script setup lang="ts">
import crypto from "crypto-js";

const {
  loggedIn,
  user,
  session,
  fetch: refreshSession,
  clear: clearLocalSession
} = useUserSession();

// function register() {
//   $request({
//     url: "/api/service/user/register",
//     method: "POST",
//     body: {
//       username: 'administrator',
//       password: crypto.MD5('').toString()
//     }
//   });
// }

function login() {
  $request({
    url: "/api/service/user/login",
    method: "POST",
    body: {
      username: "administrator",
      password: crypto.MD5("").toString()
    }
  })
    .then(async (res) => {
      if (res.code === 200) {
        console.log(res.data);
        await refreshSession();
      }
    })
    .catch(() => {});
}
async function logout() {
  await clearLocalSession();
}

function requestTest() {
  $request<object>({
    url: "/api/service/test",
    method: "GET"
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => {
      console.log("Err !!!");
    });
}
</script>

<style lang="scss" scoped>
.test-page {
  > div {
    margin-bottom: 20px;
    word-break: break-all;
  }
}
</style>
