<script setup lang="ts">
import request from '~/service/module/business'

const str = ref('')

async function handleSuccess() {
  const res: string = await request.success()
  str.value = res || ''
}
function handleHttpError400() {
  request.error400()
}
function handleHttpError401() {
  request.error401()
}

function handleHttpError403() {
  request.error403()
}

function handleHttpError404() {
  request.error404()
}

async function handleHttpError500() {
  request.error500()
  request.error500()
}

function handleHttpError502() {
  request.error502()
}
</script>

<template>
  <div>
    请求结果：{{ str || '暂未请求' }}
    <div>业务状态码错误</div>
    <div flex justify-center gap-2>
      <button btn>
        未登录
      </button>
    </div>

    <div>HTTP状态码错误</div>
    <div flex justify-center gap-2>
      <button btn @click="handleSuccess">
        success
      </button>
      <button btn @click="handleHttpError400">
        error 400
      </button>
      <button btn @click="handleHttpError401">
        error 401
      </button>
      <button btn @click="handleHttpError403">
        error 403
      </button>
      <button btn @click="handleHttpError404">
        error 404
      </button>
      <button btn @click="handleHttpError500">
        error 500
      </button>
      <button btn @click="handleHttpError502">
        error 502
      </button>
    </div>
  </div>
</template>
