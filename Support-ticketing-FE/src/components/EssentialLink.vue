<template>
  <router-link
    v-if="!isExternal"
    :to="props.link"
    custom
    v-slot="{ isExactActive }"
  >
    <q-item
      clickable
      :active="isExactActive"
      active-class="bg-grey-5 text-black"
      @click="$emit('click')"
    >
      <q-item-section v-if="props.icon" avatar>
        <q-icon :name="props.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
        <q-item-label caption>{{ props.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>

  <q-item
    v-else
    clickable
    tag="a"
    :href="props.link"
    target="_blank"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  caption: { type: String, default: '' },
  link: { type: String, default: '/' },
  icon: { type: String, default: '' }
})

const isExternal = computed(() =>
  props.link.startsWith('http://') || props.link.startsWith('https://')
)
</script>
