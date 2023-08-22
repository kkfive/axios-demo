<script setup lang="ts">
import cacheRequest from '~/service/module/cache'

const hitokoto = ref('')

function requestSuccess() {
  cacheRequest.success().then((res) => {
    hitokoto.value = res.data.hitokoto
  })
}
function requestSuccessNoCache() {
  cacheRequest.noCache().then((res) => {
    hitokoto.value = res.data.hitokoto
  })
}
</script>

<template>
  <div>
    <p>默认实例</p>
    <p>{{ hitokoto }}</p>
    <div flex justify-center gap-2>
      <button btn @click="requestSuccess">
        请求一下 success
      </button>
      <button btn @click="requestSuccessNoCache">
        请求一下 无缓存
      </button>
    </div>
  </div>
</template>
