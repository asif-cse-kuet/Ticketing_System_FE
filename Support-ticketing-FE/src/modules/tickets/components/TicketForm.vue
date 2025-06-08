<template>
  <q-dialog v-model="dialogModel" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Create Ticket</div>
      </q-card-section>

      <q-form @submit.prevent="submitForm" ref="ticketFormRef">
        <q-card-section class="q-gutter-md">
          <q-input
            filled
            v-model="form.subject"
            label="Subject"
            :rules="[val => !!val || 'Subject is required']"
          />
          <q-input
            filled
            v-model="form.description"
            label="Description"
            type="textarea"
            :rules="[val => !!val || 'Description is required']"
          />
          <q-select
            filled
            v-model="form.category"
            label="Category"
            :options="['technical', 'billing', 'general']"
            :rules="[val => !!val || 'Category is required']"
          />
          <q-select
            filled
            v-model="form.priority"
            label="Priority"
            :options="['low', 'medium', 'high']"
            :rules="[val => !!val || 'Priority is required']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="closeDialog" />
          <q-btn label="Create" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ticketService } from 'src/services/tickets'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'created'])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const ticketFormRef = ref(null)

const form = ref({
  subject: '',
  description: '',
  category: '',
  priority: ''
})

const submitForm = async () => {
  const isValid = await ticketFormRef.value?.validate()
  if (!isValid) return
  try {
    const { data } = await ticketService.create(form.value)
    emit('created', data.ticket)
    dialogModel.value = false
    resetForm()
  } catch (err) {
    console.error('Failed to create ticket', err)
  }
}

const resetForm = () => {
  form.value = {
    subject: '',
    description: '',
    category: '',
    priority: ''
  }
}

const closeDialog = () => {
  dialogModel.value = false
  resetForm()
}
</script>
