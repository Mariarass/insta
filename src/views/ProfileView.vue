<script setup lang="ts">
import Profile from '../components/profile/Profile.vue'
</script>

<template>
  <Profile  :key="$route.params.username"/>
</template>

<style scoped>

</style>
