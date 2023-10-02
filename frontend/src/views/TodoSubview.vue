<template>
  <v-main>
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
      <v-input v-model="searchFts"/>
          <v-card>
            <v-card-title>
              {{ todo.title }}
            </v-card-title>
            <v-card-subtitle>
              <v-chip-group>
                <v-chip>{{ todo.stage }}</v-chip>
              </v-chip-group>
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
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoSubview',
  data () {
    return {
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
          stage: 'in_progress',
          is_private: true
        }, {
          id: 3,
          title: 'Гигазадача v3.0',
          description: 'Описание задачи',
          stage: 'in_progress',
          is_private: true
        }
      ],
      searchFts: '',
    }
  },
})
</script>
