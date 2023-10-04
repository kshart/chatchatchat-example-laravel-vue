<template>
  <v-card>
    <v-card-title>
      {{ todo.title }}
      <v-chip>{{ todo.stage }}</v-chip>
    </v-card-title>
    <v-card-subtitle>
      12.11.2023 {{ todo.user ? todo.user.name : todo.author_id }}
    </v-card-subtitle>
    <v-card-item>
      {{ todo.description }}
    </v-card-item>
    <v-card-actions>
      <v-btn>Done</v-btn>
      <v-btn>Work</v-btn>
      <v-btn>Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import Api from '@/api'
import { Todo } from '@/api/todo'

export default defineComponent({
  props: {
    todo: Object as PropType<Todo>,
  },
  methods: {
    create () {
      // Api.todo.create({
      //   title: this.title,
      //   description: this.description,
      //   stage: this.stage,
      //   isPrivate: this.isPrivate,
      // })
    }
  }
})
</script>
