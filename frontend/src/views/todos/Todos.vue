<template>
  <v-app-bar :height="56">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      v-model="searchFts"
      label="Search"
      :loading="loading"
      single-line
      hide-details
    />
  </v-app-bar>
  <v-main class="bg-grey-lighten-3">
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col
          v-for="todo in todos"
          :key="todo.id"
          cols="12"
        >
          <TodoItem :todo="todo" />
        </v-col>
      </v-row>
      <v-layout v-if="$vuetify.display.mobile" justify-center>
        <v-dialog
          v-model="showCreateTodo"
          hide-overlay
          fullscreen
          transition="dialog-bottom-transition"
        >
          <Creator
            @close="showCreateTodo = false"
            @created="addTodo($event)"
          />
        </v-dialog>
      </v-layout>
      <v-layout v-else justify-center>
        <v-dialog
          v-model="showCreateTodo"
          width="500"
        >
          <Creator
            @close="showCreateTodo = false"
            @created="addTodo($event)"
          />
        </v-dialog>
      </v-layout>
    </v-container>
    <div v-if="$vuetify.display.mobile" class="pr-3 bottom-btn">
      <v-btn
        size="large"
        icon="mdi-plus"
        color="primary"
        @click="showCreateTodo = true"
      />
    </div>
    <div v-else class="pr-5 bottom-btn">
      <v-btn
        size="x-large"
        icon="mdi-plus"
        color="primary"
        @click="showCreateTodo = true"
      />
    </div>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Api from '@/api'
import { Todo } from '@/api/todo'
import { User } from '@/api/user'
import Creator from './Creator.vue'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  components: {
    Creator,
    TodoItem,
  },
  data () {
    return {
      showCreateTodo: false,
      loading: true,
      page: 1,
      perPage: 20,
      total: 0,
      totalPages: 0,
      todos: [] as Todo[],
      searchFts: '',
    }
  },
  beforeMount () {
    Api.todo.search('', 1, 100)
      .then(paginator => {
        this.page = paginator.page
        this.total = paginator.total
        this.totalPages = paginator.totalPages
        this.todos = paginator.data
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    load () {
      Api.todo.search('', 1, 100)
        .then(das => console.log(das))
    },
    addTodo (todo: Todo) {
      console.log(todo)
      this.todos.unshift(todo)
      this.showCreateTodo = false
    }
  }
})
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 2000;
}
</style>
