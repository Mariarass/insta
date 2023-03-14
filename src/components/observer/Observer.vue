<script setup lang="ts">

import {onMounted, ref} from "vue";

const observe = ref(null)
const root = ref(null)

const emits = defineEmits(['intersecting'])

onMounted(() => {
  //@ts-ignore
  observe.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emits('intersecting')
    }
  })
//@ts-ignore
  observe.value.observe(root.value)

})
</script>

<template>
  <div class="observer" ref="root">

  </div>
</template>

<style scoped>
.observer {
  width: 100px;
  height: 100px;

}

</style>