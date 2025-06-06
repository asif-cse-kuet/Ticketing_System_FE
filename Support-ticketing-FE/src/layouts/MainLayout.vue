<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Customer Support Ticketing System
        </q-toolbar-title>

        <div>App Version {{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Directories
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Login',
    icon: 'login',
    link: '/login'
  },
  {
    title: 'Register',
    icon: 'person_add',
    link: '/register'
  },
  {
    title: 'Chat Support',
    icon: 'chat',
    link: '/chat'
  },
  {
    title: 'Documentation',
    icon: 'code',
    link: 'https://github.com/asif-cse-kuet/Ticketing_System_FE'
  }
]


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
