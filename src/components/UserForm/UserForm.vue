<template lang="pug">
  form(@submit.prevent="submitHandler")
    span Select Git User
    input(
      v-model="login"
    )
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "UserForm",
  data: () => ({
    login: ""
  }),
  mounted() {
    this.login = this.user.login
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["getUser"]),
    submitHandler() {
      this.getUser(this.login)
    }
  }
}
</script>
