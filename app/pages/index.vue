<template>
  <div>
    <div>Page Index</div>
    <div>
      <button @click="requestTest">test</button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
