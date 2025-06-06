<template>
  <q-page class="q-pa-md row justify-center">
    <div class="column q-gutter-md" style="width: 100%; max-width: 400px">
      <h4 class="text-center">Login to SupportPro</h4>

      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Email is required']"
      />

      <q-input
        filled
        v-model="password"
        label="Password"
        type="password"
        lazy-rules
        :rules="[val => !!val || 'Password is required']"
      />

      <q-btn label="Login" color="primary" @click="handleLogin" :loading="loading" />

      <q-banner v-if="error" dense class="bg-red-2 text-red">
        {{ error }}
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

async function handleLogin () {
  error.value = ''
  loading.value = true

  const success = await authStore.login({ email: email.value, password: password.value })

  loading.value = false

  if (success) {
    router.push('/tickets')
  } else {
    error.value = 'Invalid credentials or server error.'
  }
}
</script>
