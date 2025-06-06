<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <h4>My Tickets</h4>
      <q-btn label="Create Ticket" color="primary" @click="showForm = true" />
    </div>

    <q-list bordered padding v-if="tickets.length">
      <q-item
        v-for="(ticket, index) in tickets"
        :key="ticket.id"
        clickable
        @click="viewTicket(ticket)"
      >
        <q-item-section avatar>
          <q-avatar size="32px" color="grey-3" text-color="grey-10">
            <span class="text-caption">{{ index + 1 }}</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ ticket.subject }}</q-item-label>
          <q-item-label caption>{{ ticket.category }} | {{ ticket.priority }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="statusColor(ticket.status)" class="text-capitalize">
            {{ ticket.status }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else>No tickets found.</div>

    <!-- Dialog -->
    <TicketForm v-model="showForm" @created="addTicket" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TicketForm from '../components/TicketForm.vue'

const showForm = ref(false)

const tickets = ref([
  {
    id: 1,
    subject: 'Issue A',
    category: 'Technical',
    priority: 'High',
    status: 'open'
  },
  {
    id: 2,
    subject: 'Billing Query',
    category: 'Billing',
    priority: 'Medium',
    status: 'closed'
  }
])

const addTicket = (ticket) => {
  tickets.value.unshift(ticket)
}

const viewTicket = (ticket) => {
  console.log('Clicked ticket:', ticket)
}

const statusColor = (status = 'pending') => {
  const map = {
    open: 'blue',
    closed: 'grey',
    resolved: 'green',
    'in progress': 'orange',
    pending: 'red'
  }
  return map[status.toLowerCase()] ?? 'red'
}
</script>
