<template>
  <v-card>
    <v-card-title>
      {{ todo.title }}
      <v-chip>{{ stageFormat(todo.stage) }}</v-chip>
    </v-card-title>
    <v-card-subtitle>
      12.11.2023 {{ todo.user ? todo.user.name : todo.author_id }}
    </v-card-subtitle>
    <v-card-item>
      {{ todo.description }}
    </v-card-item>
    <v-card-actions v-if="todo.can_edit">
      <v-btn @click="setStatus('done')">Done</v-btn>
      <v-btn @click="setStatus('in_work')">Work</v-btn>
      <v-btn @click="setStatus('deleted')">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable vue/no-mutating-props */
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import Api from '@/api'
import { Todo, TodoStage } from '@/api/todo'

export default defineComponent({
  props: {
    todo: Object as PropType<Todo>,
  },
  computed: {
    stageFormat () {
      return (stage: TodoStage) => {
        switch (stage) {
          case 'new':
            return 'New'
          case 'in_work':
            return 'In work'
          case 'done':
            return 'Done'
          case 'deleted':
            return 'Deleted'
        }
        return ''
      }
    },
  },
  methods: {
    create () {
      // Api.todo.create({
      //   title: this.title,
      //   description: this.description,
      //   stage: this.stage,
      //   isPrivate: this.isPrivate,
      // })
    },
    setStatus (stage: TodoStage) {
      if (!this.todo) {
        return
      }
      this.todo.stage = stage
      Api.todo.update(this.todo.id, { stage })
    },
  }
})
</script>
