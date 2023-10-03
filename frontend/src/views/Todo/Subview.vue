<template>
  <v-container class="py-8 px-6" fluid>
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      v-model="searchFts"
      label="Search"
      loading
    />
    <v-row>
      <v-col
        v-for="todo in todos"
        :key="todo.id"
        cols="12"
      >
        <ListView :todo="todo" />
      </v-col>
    </v-row>
    <v-layout v-if="$vuetify.display.mobile" justify-center>
      <v-dialog
        v-model="showCreateTodo"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
      >
        <Creator @close="showCreateTodo = false" />
      </v-dialog>
    </v-layout>
    <v-layout v-else justify-center>
      <v-dialog
        v-model="showCreateTodo"
        width="500"
      >
        <Creator @close="showCreateTodo = false" />
      </v-dialog>
    </v-layout>
  </v-container>
  <v-layout-item model-value position="bottom" class="px-8 text-end" size="88">
    <v-btn
      size="x-large"
      icon="mdi-plus"
      color="primary"
      @click="showCreateTodo = true"
    />
  </v-layout-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Creator from './Creator.vue'
import ListView from './ListView.vue'

export default defineComponent({
  name: 'Subview',
  components: {
    Creator,
    ListView,
  },
  data () {
    return {
      showCreateTodo: false,
      todos: [
        {
          id: 1,
          title: 'Гигазадача v1.0',
          description: 'Описание задачи',
          stage: 'deleted',
          is_private: true
        }, {
          id: 2,
          title: 'Гигазадача v2.0',
          description: 'Описание задачи',
          stage: 'in_work',
          is_private: true
        }, {
          id: 3,
          title: 'Гигазадача v3.0',
          description: 'Описание задачи',
          stage: 'new',
          is_private: true
        }
      ],
      searchFts: '',
    }
  },
})
</script>
