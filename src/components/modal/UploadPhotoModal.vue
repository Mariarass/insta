<script setup lang="ts">
import {ref} from "vue"
import {supabase} from "@/supabase";
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {CloudUploadOutlined} from '@ant-design/icons-vue'

import {useProfileStore} from "@/stores/profile";
import {convertFileToBase64} from "@/utils/converFile";

const userStore = useUsersStore()
const profileStore = useProfileStore()
const {updateCountPost} = profileStore
const {user} = storeToRefs(userStore)


const props = defineProps(['addNewPost'])

const visible = ref<boolean>(false)
const file = ref(null)
const caption = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const image = ref('')


const showModal = () => {
  visible.value = true
}

const handleOk = async (e: MouseEvent) => {
  if (file.value) {
    const fileName = Math.floor(Math.random() * 100000000)
    isLoading.value = true
    const {data, error} = await supabase.storage.from('images').upload('public/' + fileName, file.value)
    if (data) {

      const post = {
        url: data.path,
        caption: caption.value,
        owner_id: user.value?.id
      }
      await supabase.from('posts').insert(post)

      props.addNewPost(post)

      errorMessage.value = ''
      visible.value = false
      caption.value = ''
      updateCountPost()

    } else {
      errorMessage.value = error?.message
    }
    isLoading.value = false
    image.value = ''

  }


}

const handleUpload = (e: any) => {
  const photo = e.target.files[0]
  if (photo) {
    file.value = e.target.files[0]
    convertFileToBase64(photo, (file64: string) => {
      image.value = file64

    })
  }

}
const handleCancel = () => {
  image.value = ''
  visible.value = false

}
</script>

<template>

  <AButton type="primary" @click="showModal">Add post</AButton>
  <AModal v-model:visible="visible" title="Add post">
    <ASpin :spinning="isLoading">
      <div class="modal">

        <label v-if="image===''">

          <input type="file" accept=".jpeg,.png,.JPG" @change="handleUpload" class="file"/>
          <span class="upload-container">
            <CloudUploadOutlined class="icon"/>
          </span>
        </label>
        <div v-else>
          <img class="image" :src="image"/>
        </div>
        <AInput v-model:value="caption"/>
      </div>

    </ASpin>
    <p>{{ errorMessage }}</p>

    <template #footer>
      <AButton :disabled="isLoading" @click="handleCancel">Cancel</AButton>
      <AButton :disabled="isLoading" @click="handleOk">Ok</AButton>
    </template>


  </AModal>

</template>

<style scoped>
.input {
  margin-top: 10px;

}

.modal {

  text-align: center;

  gap: 20px;
}

.file {
  display: none;
}

.icon {
  color: #404052;
  font-size: 30px;
  cursor: pointer;
  text-align: center;
  background-color: #fff;
  margin-bottom: 30px;
}

.image {
  height: 300px;
  margin-bottom: 30px;
  max-width: 100%;
}
</style>
