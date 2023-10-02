<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-sheet
        color="grey-lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
          image="/assets/logo.png"
        />

        <div>john@google.com</div>
      </v-sheet>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="{ icon, title, to }, index in links"
          :key="index"
          :prepend-icon="icon"
          :title="title"
          :to="to"
          link
        />
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data () {
    return {
      drawer: null,
      links: [
        {
          icon: 'mdi-calendar-check-outline',
          title: 'Todos',
          to: '/todos',
        }, {
          icon: 'mdi-account-box-multiple-outline',
          title: 'Users',
          to: '/users',
        },
      ],
    }
  },
})
</script>
