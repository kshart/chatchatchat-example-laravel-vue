<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-left">Name</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>#{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.created_at }}</td>
            <td>
              <v-btn-group>
                <v-btn>set admin</v-btn>
                <v-btn>delete</v-btn>
              </v-btn-group>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserSubview',
  data () {
    return {
      users: [
        {
          id: 1,
          name: 'Артём',
          phone: '1234',
          email: null,
          email_verified_at: null,
          created_at: '2023-09-30T18:30:18.000000Z',
          updated_at: '2023-09-30T18:30:18.000000Z'
        }, {
          id: 2,
          name: 'Артём',
          phone: '+79123940185',
          email: null,
          email_verified_at: null,
          created_at: '2023-09-30T18:34:19.000000Z',
          updated_at: '2023-09-30T18:34:19.000000Z'
        }
      ],
    }
  },
})
</script>
