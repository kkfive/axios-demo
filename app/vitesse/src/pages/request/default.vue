<script setup lang="ts">
import defaultRequest from '~/service/module/default'

const hitokoto = ref('')

function requestSuccess() {
  defaultRequest.success().then((res) => {
    hitokoto.value = res.data.hitokoto
  })
  // defaultRequest.success().then((res) => {
  //   hitokoto.value = res.data.hitokoto
  // })
}
function requestSuccess2() {
  defaultRequest.success1().then((res) => {
    hitokoto.value = res.data.hitokoto
  })
  // defaultRequest.success().then((res) => {
  //   hitokoto.value = res.data.hitokoto
  // })
}
function requestError() {
  defaultRequest.error()
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
      <button btn @click="requestSuccess2">
        请求一下 success2
      </button>
      <button btn @click="requestError">
        请求一下 error
      </button>
    </div>
  </div>
</template>
