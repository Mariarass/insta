<script setup >
import {defineProps} from "vue";
import {supabase} from "@/supabase";
import { useRouter} from "vue-router";


const props = defineProps(['card'])
const router=useRouter()
const getUser=async ()=>{
  const {data} = await supabase.from('users').select().eq('id',props.card.owner_id).single()
  console.log(data)
  if(data){
    router.push(`/profile/${data.username}`)
  }
  else {
    console.log('some error')
  }

}
</script>

<template>
  <ACard class="card" hoverable style="width: 240px" @click="getUser">
    <template #cover>
      <img alt="example" :src="`https://gpzjliipmmodhjufbiua.supabase.co/storage/v1/object/public/images/${card.url}`"/>
    </template>
    <ACardMeta :title="card.username">
      <template #description>{{card.caption}}</template>
    </ACardMeta>
  </ACard>

</template>

<style scoped>
.card {
  margin-bottom: 20px;
  height: 300px;
}
</style>
