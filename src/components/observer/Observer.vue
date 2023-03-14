<script setup>

import {onMounted, ref} from "vue";

const observe = ref(null)
const root = ref(null)

const emits = defineEmits(['intersecting'])

onMounted(() => {
  observe.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emits('intersecting')
    }
  })

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