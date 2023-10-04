<template>
  <v-card>
    <v-card-title>Create todo</v-card-title>
    <v-card-item>
      <v-form ref="form">
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
        />
        <v-btn-toggle
          v-model="stage"
          color="secondary"
          class="mb-4"
        >
          <v-btn value="new">
            New
          </v-btn>
          <v-btn value="in_work">
            In work
          </v-btn>
        </v-btn-toggle>
        <v-textarea
          v-model="description"
          :rules="descriptionRules"
          label="Description"
        />
        <v-checkbox v-model="isPrivate" label="Private" />
      </v-form>
    </v-card-item>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:append>
          <v-btn size="large" @click="$emit('close')">Close</v-btn>
          <v-btn size="large" color="primary" variant="elevated" @click="create">Create</v-btn>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Api from '@/api'

export default defineComponent({
  data () {
    return {
      title: '',
      description: '',
      stage: 'new',
      isPrivate: false,
      titleRules: [(v: string) => !!v || 'Name is required'],
      descriptionRules: [(v: string) => !!v || 'Description is required'],
    }
  },
  methods: {
    async create () {
      if (!this.$refs.form) {
        return
      }
      const { valid } = await (this.$refs.form as any).validate()

      if (valid) {
        Api.todo.create({
          title: this.title,
          description: this.description,
          stage: this.stage,
          is_private: this.isPrivate,
        })
      }
    },
  }
})
</script>
