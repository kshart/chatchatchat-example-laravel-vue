<template>
  <v-app-bar :height="56">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      v-model="fts"
      label="Search"
      :loading="loading"
      single-line
      hide-details
      autocomplete="off"
      @input="changeFts()"
      @keydown.enter="changeFtsNow()"
    />
  </v-app-bar>
  <v-main class="bg-grey-lighten-3">
    <v-container class="py-8 px-6" fluid>
      <VInfiniteScroll class="w-100 bg-grey-lighten-3" @load="pullTodos">
        <v-row>
          <v-col
            v-for="todo in todos"
            :key="todo.id"
            cols="12"
          >
            <TodoItem :todo="todo" />
          </v-col>
        </v-row>
        <template #empty>
          Loaded {{ todos.length }} todos
        </template>
      </VInfiniteScroll>
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
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import Api from '@/api'
import { Todo } from '@/api/todo'
import Creator from './Creator.vue'
import TodoItem from './TodoItem.vue'
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll'

export default defineComponent({
  components: {
    Creator,
    TodoItem,
    VInfiniteScroll,
  },
  setup () {
    return {
      changeFtsTimeout: undefined as number|undefined,
    }
  },
  data () {
    return {
      showCreateTodo: false,
      loading: false,
      page: 1,
      perPage: 5,
      total: 0,
      totalPages: 0,
      todos: [] as Todo[],
      fts: '',
      pullConfig: {
        key: +new Date(),
        fts: '',
      }
    }
  },
  beforeRouteEnter (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const perPage = 5
    const fts = (to.query.fts || '').toString()
    let page = Number(to.query.page || 1)
    if (Number.isNaN(page)) {
      page = 1
    }
    Api.todo.search(decodeURIComponent(fts), 1, page * perPage)
      .then(paginator => {
        next((vm: any) => {
          vm.fts = fts
          vm.perPage = perPage
          vm.page = page
          vm.total = paginator.total
          vm.totalPages = Math.ceil(paginator.total / perPage)
          vm.todos = paginator.data
          vm.pullConfig = {
            key: +new Date(),
            fts,
          }
        })
      })
  },
  beforeUnmount () {
    clearTimeout(this.changeFtsTimeout)
  },
  methods: {
    changeFts () {
      console.log('changeFts')
      clearTimeout(this.changeFtsTimeout)
      this.changeFtsTimeout = setTimeout(() => {
        this.changeFtsTimeout = undefined
        this.reloadTodos()
      }, 750)
    },
    changeFtsNow () {
      console.log('changeFtsNow')
      clearTimeout(this.changeFtsTimeout)
      this.changeFtsTimeout = undefined
      this.reloadTodos()
    },
    reloadTodos () {
      console.log('reloadTodos')
      this.loading = true
      const fts = this.fts
      Api.todo.search(fts, 1, this.perPage)
        .then(paginator => {
          this.pullConfig.fts = fts
          this.pullConfig.key = +new Date()
          this.page = paginator.page
          this.total = paginator.total
          this.totalPages = paginator.totalPages
          this.todos = paginator.data
          const { page, ...query } = this.$route.query
          return this.$router.replace({
            path: this.$route.path,
            query: {
              ...query,
              fts: encodeURIComponent(fts)
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    async pullTodos (options: {
      done: (status: 'ok' | 'empty' | 'loading' | 'error') => void
    }) {
      console.log('pullTodos', this.page, this.totalPages)
      if (this.page >= this.totalPages) {
        return options.done('empty')
      }
      try {
        const key = this.pullConfig.key
        const paginator = await Api.todo.search(this.pullConfig.fts, this.page + 1, this.perPage)
        if (key !== this.pullConfig.key) {
          return options.done('empty')
        }
        this.page = paginator.page
        this.total = paginator.total
        this.totalPages = paginator.totalPages
        this.todos = this.todos.concat(paginator.data)
        if (paginator.page >= paginator.totalPages || paginator.data.length <= 0) {
          options.done('empty')
        } else {
          options.done('ok')
        }
        await this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: paginator.page
          }
        })
      } catch (error) {
        console.error(error)
        options.done('error')
      }
    },
    addTodo (todo: Todo) {
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
