<script setup lang="ts">
import {LoginOutlined} from '@ant-design/icons-vue';
import {defineProps, reactive, ref} from "vue"
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const useStore = useUsersStore()

const {errorMessage, isLoading, user} = storeToRefs(useStore)

const visible = ref<boolean>(false)
const props = defineProps(['isLogin'])

const title = props.isLogin ? 'Login' : 'SignUp'

const userCredentials = reactive({
  username: '',
  email: '',
  password: ''

})

const showModal = () => {
  visible.value = true
}

const clearInput = () => {
  visible.value = false
  userCredentials.username = ''
  userCredentials.email = ''
  userCredentials.password = ''
  useStore.clearErrorMessage()
}
const handleOk = async (e: MouseEvent) => {

  if (props.isLogin) {

    await useStore.handleLogin({
      email: userCredentials.email,
      password: userCredentials.password
    })
  } else {
    await useStore.handleSignup(userCredentials)
  }
  if (user.value?.id) {
    clearInput()
  }

}


</script>

<template>

  <AButton type="primary" @click="showModal" class="button">{{ title }}</AButton>
  <p class="p" @click="showModal">{{ title }}</p>
  <AModal v-model:visible="visible" :title="title">

    <template #footer>
      <AButton :disabled="isLoading" @click="clearInput">Cancel</AButton>
      <AButton :disabled="isLoading" @click="handleOk">Ok</AButton>
    </template>
    <p class="test">
      Use test account :<br/>
      login - test@gmail.com<br/>
      password - 123456
    </p>

    <ASpin :spinning="isLoading">
      <AInput class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Name"/>
      <p>{{ errorMessage.username }}</p>
      <AInput class="input" v-model:value="userCredentials.email" placeholder="Email"/>
      <p>{{ errorMessage.email }}</p>
      <AInputPassword class="input" v-model:value="userCredentials.password" placeholder="Password"/>
      <p>{{ errorMessage.password }}</p>
      <p>{{ errorMessage.auth }}</p>
    </ASpin>

  </AModal>

</template>

<style scoped>
.input {
  margin-top: 10px;

}

.p {
  display: none;
}

@media (max-width: 630px ) {

  .p {
    display: flex
  }
  .button{
    display: none;
  }


}
.test{
  font-size: 10px;
}
</style>
