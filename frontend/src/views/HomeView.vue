<template>
  <v-app id="inspire">
    <v-layout>
      <v-navigation-drawer v-if="!$vuetify.display.mobile" v-model="drawer">
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
            <v-btn block @click="logout">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="bg-grey-lighten-3" scrollable>
        <router-view />
      </v-main>
      <v-bottom-navigation v-if="$vuetify.display.mobile" order="-1">
        <v-btn
          v-for="{ icon, title, to }, index in links"
          :to="to"
          :key="index"
          :prependIcon="icon"
          :text="title"
        />
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import Api from '@/api'
import { Me } from '@/api/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data () {
    return {
      me: null as Me|null,
      drawer: false,
      color: '',
      value: '',
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
  beforeMount () {
    this.drawer = !this.$vuetify.display.mobile
  },
  methods: {
    logout () {
      Api.user.logout()
        .finally(() => {
          window.location.reload()
        })
    },
  }
})
</script>
