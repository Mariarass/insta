<script setup lang="ts">

import Container from "@/components/container/Container.vue";
import UserBar from "@/features/profile/user-bar/UserBar.vue";
import ImageGallery from "@/features/profile/imge-gallery/ImageGallery.vue";
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {useProfileStore} from "@/stores/profile";


const route = useRoute()
const userStore = useUsersStore()
const profileStore = useProfileStore()
const {addNewPost, updateIsFollowing} = profileStore
const {user, isFollowing, isLoading, posts, userInfo} = storeToRefs(profileStore)
const name = ref('')

const {user: loggedInUser} = storeToRefs(userStore)
const {username} = route.params


watch(loggedInUser, async () => {

  await profileStore.fetchFollowing(loggedInUser)


})
onMounted(() => {
  profileStore.fetchPosts(username, loggedInUser)

})


watch(route, () => {
  const param = route.params.username
  name.value = Array.isArray(param) ? param[0] : param
})

</script>


<template>
  <Container>
    <div v-if="isLoading" class="spinner">
      <ASpin/>
    </div>
    <div v-else>
      <div v-if="user">
        <UserBar
            :user="user"
            :key="name"
            :addNewPost="addNewPost"
            :isFollowing="isFollowing"
            :updateIsFollowing="updateIsFollowing"
            :userInfo="userInfo"
        />
        <ImageGallery :posts="posts"/>
      </div>
      <div v-else class="spinner">
        User not found<br/>
        Try: maria, selena , denis
      </div>

    </div>
    <div>

    </div>

  </Container>
</template>

<style scoped>

</style>
