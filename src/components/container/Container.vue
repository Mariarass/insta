<script setup lang="ts">

</script>

<template>
<div class="container">
  <slot></slot>

</div>
</template>

<style scoped>
.container{
  width: 80%;
  margin: 0 auto;
}

@media (max-width: 630px ) {
  .container{
    width: 90%;
  }


}
</style>
