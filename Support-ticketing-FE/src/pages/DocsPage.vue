<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Documentation</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div v-html="renderedMarkdown" class="markdown-body" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const renderedMarkdown = ref('Loading...')

onMounted(async () => {
  try {
    const res = await fetch('/docs/readme.md')
    const raw = await res.text()
    renderedMarkdown.value = marked.parse(raw)
  } catch  {
    renderedMarkdown.value = '❌ Failed to load documentation.'
  }
})
</script>

<style>
.markdown-body {
  line-height: 1.6;
  font-size: 16px;
}

.markdown-body h1,
.markdown-body h2 {
  margin-top: 1rem;
  color: #2c3e50;
}
</style>
