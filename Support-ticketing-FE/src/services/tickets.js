import { client } from 'src/services/client'

const RESOURCE = 'tickets'

export const ticketService = {
  async getAll() {
    return await client.get('tickets')
  },
  async create(payload) {
    return await client.post(RESOURCE, payload)
  },
  async update(id, payload) {
    return await client.put(`${RESOURCE}/${id}`, payload)
  },
  async delete(id) {
    return await client.delete(`${RESOURCE}/${id}`)
  },
  async updateStatus(id, payload) {
    return await client.patch(`${RESOURCE}/${id}/status`, payload)
  },
  async get(id) {
    return await client.get(`${RESOURCE}/${id}`)
  }
}
