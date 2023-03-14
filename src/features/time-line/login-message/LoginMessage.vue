<script setup lang="ts">
import loginIcon from '@/assets/login.svg'
</script>

<template>
  <h3 class="spinner">
    Log on for to see post.
    <img  class='img' :src="loginIcon"/>
  </h3>
</template>

<style scoped>
.img{
  width: 300px;
  margin-top: 30px;
}
h3{
  text-transform: uppercase;
}
</style>
