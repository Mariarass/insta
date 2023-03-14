<script setup lang="ts">
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import Card from "@/components/card/Card.vue";
import {supabase} from "@/supabase";
import {onMounted, ref} from "vue";
import Observer from "@/components/observer/Observer.vue";

const userStore = useUsersStore()
const {user} = storeToRefs(userStore)

const posts = ref<any>([])
const lastCardIndex = ref(2)
const owner_ids = ref<any>([])
const reachEnd = ref(false)
const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true
  const {data: followings} = await supabase
      .from('follower')
      .select('following_id')
      .eq('followers_id', user.value?.id)
  if (followings) {

    owner_ids.value = followings?.map(el => el.following_id)
    const {data} = await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids.value)
        .range(0, lastCardIndex.value)
        .order('created_at', {ascending: false})

    posts.value = data
  } else {
    console.log('Error')
    posts.value = []
  }
  isLoading.value = false
}

onMounted(() => {
  fetchData()

})
const fetchNextSet = async () => {

  if (!reachEnd.value) {
    const {data} = await supabase
        .from('posts')
        .select()
        .in('owner_id', owner_ids.value)
        .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
        .order('created_at', {ascending: false})
//@ts-ignore
    posts.value = [...posts.value, ...data]

    lastCardIndex.value = lastCardIndex.value + 3
    //@ts-ignore
    if (!data.length) {

      reachEnd.value = true
    }
  }


}
</script>

<template>
  <div v-if="isLoading" class="spinner">
    <ASpin/>
  </div>
  <div v-else>
    <div v-if="posts.length!=0">
      <div class="timeline-container" v-if="user">
        <Card v-for="card in posts" :key="card.id" :card="card"/>
      </div>
      <Observer v-if="posts.length" @intersecting="fetchNextSet"/>
    </div>
    <div v-else class="spinner">
      <p>You don't have any friends who added a photo.<br/>
        You can add
        <RouterLink to="/profile/maria">me</RouterLink>
      </p>
    </div>
  </div>


</template>

<style scoped>

</style>
