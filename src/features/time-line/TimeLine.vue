<script setup lang="ts">

import Container from "@/components/container/Container.vue"
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import LoginMessage from "@/features/time-line/login-message/LoginMessage.vue";
import Cards from "@/features/time-line/cards/Cards.vue";

const userStore = useUsersStore()
const {user, isUserLoading} = storeToRefs(userStore)
</script>

<template>

  <Container>
    <div v-if="!isUserLoading">

      <Cards v-if="user"/>
      <LoginMessage v-else/>

    </div>
    <div v-else class="spinner">
      <ASpin/>
    </div>


  </Container>

</template>

<style>
.timeline-container {
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
