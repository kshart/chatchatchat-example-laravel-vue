<template>
  <div>
    <v-text-field
      label="Phone"
      placeholder="+78005553535"
      type="text"
    />
    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showPassword ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 4 characters"
      counter
      @click:append="showPassword = !showPassword"
    />
    <v-btn variant="flat" color="primary">Login</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      password: '',
      showPassword: false,
      rules: {
        required: (value: string) => !!value || 'Required.',
        min: (value: string) => value.length >= 4 || 'Min 4 characters',
      },
    }
  }
})
</script>
