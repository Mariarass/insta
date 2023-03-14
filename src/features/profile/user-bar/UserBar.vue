<script setup lang="ts">
import {defineProps, ref} from "vue";
import UploadPhotoModal from "@/components/modal/UploadPhotoModal.vue";

import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import {supabase} from "@/supabase";

const props = defineProps(['user', 'addNewPost', 'isFollowing', 'updateIsFollowing', 'userInfo'])

const router = useRoute()
const userStore = useUsersStore()

const {username: profileUserName} = router.params
const {user} = storeToRefs(userStore)

const isLoading = ref(false)

const followUser = async () => {
  props.updateIsFollowing(true)
  isLoading.value = true
  await supabase.from('follower').insert({
    followers_id: user.value?.id,
    following_id: props.user.id
  })
  isLoading.value = false
}
const unfollowUser = async () => {
  props.updateIsFollowing(false)
  isLoading.value = true
  await supabase.from('follower')
      .delete()
      .eq('followers_id', user.value?.id)
      .eq('following_id', props.user.id)
  isLoading.value = false
}

</script>
<template>
  <div class="user-bar-container">
    <div class="top-content">
      <h3>{{ props.user.username }}</h3>
      <div v-if="user">
        <UploadPhotoModal v-if="profileUserName===user.username" :addNewPost="addNewPost"/>
        <div v-else>
          <AButton :disabled="isLoading" v-if="!isFollowing" @click="followUser">Follow</AButton>
          <AButton :disabled="isLoading" v-else @click="unfollowUser">Unfollow</AButton>
        </div>

      </div>


    </div>
    <div class="bottom-content">
      <p>{{ userInfo.posts }} posts</p>
      <p> {{ userInfo.following }} followers</p>
      <p> {{ userInfo.followers}} following</p>


    </div>

  </div>


</template>
<style scoped>
.user-bar-container {

  margin-top: 30px;
}

.bottom-content {
  display: flex;
  align-items: center;

}
.top-content{

  display: flex;
  justify-content: space-between;
}

p {
  margin-right: 10px;
}
h3{
  text-transform:uppercase;
}
</style>

