<template>
  <!-- 此组件负责通过 DOM 劫持副标题，实现打字机效果 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let timeoutId: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // 延迟一丢丢等待 VitePress 原生 Hero 渲染完成
  setTimeout(() => {
    // 寻找主页副标题的 DOM 元素
    const textEl = document.querySelector('.VPHomeHero .text') as HTMLElement
    if (!textEl) return

    const originalText = textEl.innerText
    textEl.innerText = '' // 清空原本的文字
    
    // 创建一个光标元素
    textEl.style.position = 'relative'
    textEl.style.display = 'inline-block'
    
    // 开始打字机逻辑
    let index = 0
    function typeWriter() {
      if (index < originalText.length) {
        textEl.innerText = originalText.substring(0, index + 1) + ' |'
        index++
        // 随机停顿时间 50 ~ 150ms 模仿真实敲击
        timeoutId = setTimeout(typeWriter, Math.random() * 100 + 50)
      } else {
        // 打字结束，保留闪烁光标
        textEl.innerText = originalText
        textEl.innerHTML += '<span class="cursor-blink">|</span>'
      }
    }
    
    typeWriter()
  }, 100) // 延迟100ms
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style>
/* 给光标增加纯 CSS 的脉冲闪烁动画 */
.cursor-blink {
  animation: blink 1s step-end infinite;
  color: #bd34fe; /* 光标颜色 */
  font-weight: bold;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>