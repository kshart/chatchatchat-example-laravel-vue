<template>
  <v-card>
    <v-card-title>Create todo</v-card-title>
    <v-card-item>
      <v-text-field
        v-model="title"
        label="Title"
      />
      <v-btn-toggle
        v-model="stage"
        color="secondary"
        group
      >
        <v-btn value="new">
          New
        </v-btn>
        <v-btn value="in_work">
          In work
        </v-btn>
      </v-btn-toggle>
      <v-textarea v-model="description" label="Description"/>
    </v-card-item>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:append>
          <v-btn @click="$emit('close')">Close</v-btn>
          <v-btn color="primary" variant="elevated">Create</v-btn>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreatorCard',
  data () {
    return {
      title: '',
      description: '',
      stage: 'new',
    }
  },
})
</script>
