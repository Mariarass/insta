<script setup lang="ts">
import Profile from '../features/profile/Profile.vue'
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute()
const name = ref('')
watch(route, () => {
  const param= route.params.username
  name.value = Array.isArray(param) ? param[0] : param

})

</script>

<template>
  <Profile :key="name"/>
</template>

<style scoped>

</style>
