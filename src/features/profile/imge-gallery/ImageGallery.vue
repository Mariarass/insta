<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps(['posts'])
</script>

<template>
  <div class="img-gallery-container">
    <div class="container" v-if="posts.length!=0" >
      <img  v-for="post in posts" :key="post.id"
           :src="`https://gpzjliipmmodhjufbiua.supabase.co/storage/v1/object/public/images/${post.url}`"
           class="image"/>
    </div>
    
    <div v-else>
      Posts are empty
    </div>
  </div>
</template>
<style scoped>
.image {
  width: 300px;
  height: 300px;
}
.container{

 width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;




}
.img-gallery-container{
  display: flex;
  justify-content: center;
  margin-top: 30px;


}
@media (max-width: 1200px) {
  .image{
    width: 200px;
    height: 200px;
  }

}

@media (max-width: 600px) {
  .container{
    justify-content: center;
  }

}
</style>


