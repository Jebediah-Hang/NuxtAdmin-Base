<template>
  <div>
    <div>Page Index</div>
    <div>
      <button @click="requestTest">test</button>
    </div>
    <div>
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
    </div>
    <div>loggedIn: {{ loggedIn }}</div>
    <div>user: {{ user }}</div>
    <div>session: {{ session }}</div>
  </div>
</template>

<script setup lang="ts">
const {
  loggedIn,
  user,
  session,
  fetch: refreshSession,
  clear: clearSession
} = useUserSession();

function login() {
  $request({
    url: "/api/service/user/login",
    method: "POST"
  })
    .then(async (res) => {
      console.log(res.data);
      await refreshSession();
    })
    .catch(() => {});
}
async function logout() {
  await clearSession();
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
