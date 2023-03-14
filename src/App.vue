<script setup lang="ts">

import NavBar from "@/components/nav-bar/NavBar.vue";
import {useUsersStore} from "@/stores/users";
import {onMounted} from "vue";

const userStore = useUsersStore()


onMounted(() => {
  userStore.getUser()

})
</script>

<template>
  <NavBar/>
  <RouterView/>
</template>

<style>
.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

}
</style>
