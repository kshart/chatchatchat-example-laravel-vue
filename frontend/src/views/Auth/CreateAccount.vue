<template>
  <div>
    <v-text-field
      label="Phone"
      placeholder="+78005553535"
      type="text"
    />
    <v-text-field
      label="Username"
      placeholder="John Doe"
      type="text"
    />
    <v-text-field
      v-model="password"
      :rules="[rules.required, rules.min]"
      type="text"
      name="input-10-1"
      label="Password"
      hint="At least 4 characters"
      counter
    />
    <v-btn variant="flat" color="primary">Create account</v-btn>
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
