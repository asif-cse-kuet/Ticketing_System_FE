<template>
  <q-page class="q-pa-md row justify-center">
    <div class="column q-gutter-md" style="width: 100%; max-width: 400px">
      <h4 class="text-center">Register for SupportPro</h4>

      <q-input
        filled
        v-model="name"
        label="Full Name"
        lazy-rules
        :rules="[val => !!val || 'Name is required']"
      />

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

      <q-btn label="Register" color="primary" @click="handleRegister" :loading="loading" />

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
import client from 'src/services/client'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

async function handleRegister () {
  error.value = ''
  loading.value = true

  try {
    await client().get('/sanctum/csrf-cookie', { withCredentials: true })

    await client().post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value
    }, { withCredentials: true })

    await authStore.fetchUser()
    router.push('/tickets')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed.'
  }

  loading.value = false
}
</script>
<style scoped>

</style>
