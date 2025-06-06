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
          :title="link.title"
          :icon="link.icon"
          :caption="link.caption"
          :link="link.link"
          @click="handleLinkClick(link)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/modules/auth/stores/authStore'
import { Notify } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()


const linksList = computed(() => {
  const commonLinks = [
    { title: 'Home', icon: 'home', link: '/' },
  ]

  const externalLinks = [
    { title: 'Documentation', icon: 'code', link: 'https://github.com/asif-cse-kuet/Ticketing_System_FE' }
  ]

  const guestLinks = [
    { title: 'Login', icon: 'login', link: '/login' },
    { title: 'Register', icon: 'person_add', link: '/register' }
  ]

  const authLinks = [
    { title: 'Tickets', icon: 'list_alt', link: '/tickets' },
    { title: 'Chat Support', icon: 'chat', link: '/chat' },
    { title: 'Logout', icon: 'logout', link: '__logout__' }
  ]

  return authStore.user
    ? [...commonLinks, ...authLinks, ...externalLinks]
    : [...commonLinks, ...guestLinks, ...externalLinks]
})



const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLinkClick (link) {
  const currentPath = router.currentRoute.value.fullPath
  if (link.link === currentPath) {
    leftDrawerOpen.value = false
    return
  }
  if (link.link === '__logout__') {
    await authStore.logout()
    Notify.create({ message: 'Logged out successfully', color: 'positive' })
    router.push('/login')
  } else {
    router.push(link.link)
  }
  leftDrawerOpen.value = true
}

</script>
