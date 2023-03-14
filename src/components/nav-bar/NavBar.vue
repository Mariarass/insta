<script setup lang="ts">
import {RouterLink, useRouter} from "vue-router";
import Container from "@/components/container/Container.vue";
import {ref} from "vue";
import Modal from "@/components/modal/AuthModal.vue";
import {useUsersStore} from "@/stores/users";
import {storeToRefs} from "pinia";
import {MenuUnfoldOutlined,InstagramOutlined} from '@ant-design/icons-vue';

const userStore = useUsersStore()
const {user, isUserLoading} = storeToRefs(userStore)
const search = ref('')
const router = useRouter()

const onSearch = () => {
  if (search.value) {
    router.push(`/profile/${search.value}`)
    search.value = ''
  }
}

const handleLogout = async () => {
  await userStore.handleLogout()
}

const goToProfile = () => {
  router.push(`/profile/${user.value?.username}`)

}
</script>

<template>
  <ALayoutHeader>
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/" class="logo"><InstagramOutlined/></RouterLink>
        </div>
        <div class="center-container">
          <AInputSearch
              v-model:value="search"
              placeholder="search users..."
              style="width: 200px"
              @search="onSearch"
          />
        </div>
        <div v-if="!isUserLoading" class="content">
          <div class="left-content" v-if="!user">
            <Modal :isLogin="true"/>
            <Modal :isLogin="false"/>
          </div>
          <div v-else class="left-content">
            <AButton @click="goToProfile">Profile</AButton>
            <AButton @click="handleLogout">LogOut</AButton>
          </div>
        </div>

        <AMenu mode="horizontal" theme="dark" class="menu">
          <ASubMenu key="sub1">
            <template #icon>
              <MenuUnfoldOutlined/>
            </template>
            <a-menu-item-group v-if="!user">
              <a-menu-item key="setting:1">
                <Modal :isLogin="true"/>
              </a-menu-item>
              <a-menu-item key="setting:2">
                <Modal :isLogin="false"/>
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group v-else>
              <a-menu-item key="setting:1" @click="goToProfile">Profile
              </a-menu-item>
              <a-menu-item key="setting:2" @click="handleLogout">LogOut
              </a-menu-item>
            </a-menu-item-group>
          </ASubMenu>

        </AMenu>


      </div>

    </Container>
  </ALayoutHeader>

</template>

<style scoped>
.nav-container {
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

}

.right-content {
  display: flex;
  align-items: center;
}


.center-container {
  display: flex;
  align-items: center;
}

.left-content {
  display: flex;
  gap: 20px;
  align-items: center;
}

.content {
  display: flex;
  align-items: center;
}

.logo {
  color: white;
font-size: 30px;

}

.menu {
  display: none;
}

@media (max-width: 630px ) {


  .content {
    display: none;
  }

  .menu {
    display: flex;
    align-items: center;

  }
  .logo{
    font-size: 20px;
    width: 40px;

  }


}
</style>
