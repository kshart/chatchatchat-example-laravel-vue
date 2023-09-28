<template>
  <div class="auth-view d-flex align-center justify-space-around">
    <CreateAccount class="panel" />
    <Login class="panel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Login from './Login.vue'
import CreateAccount from './CreateAccount.vue'

export default defineComponent({
  name: 'AuthView',
  components: {
    Login,
    CreateAccount,
  },
})
</script>

<style lang="scss" scoped>
.auth-view {
  min-height: 100vh;
  .panel {
    min-width: 300px;
  }
}
</style>
