<template lang="pug">
div
  template(v-if="authUserLogin")
    | Доброго времени суток {{authUserLogin}}
  template(v-else)
    div
      h2 Авторизация
      form(@submit.prevent="onSubmit")
        .row
          .input-field.col.s6
            span User
            input(type="text" v-model="login")
          .input-field.col.s6
            span Pasword
            input(type="password" v-model="password")
        button Отправить
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GitAutorize",
  data: () => ({
    login: "",
    password: ""
  }),
  computed: {
    ...mapGetters(["auth"]),
    authUserLogin() {
      return this.auth.login;
    }
  },
  methods: {
    ...mapActions(["getAuth"]),
    onSubmit() {
      const { login, password } = this;
      this.getAuth({ login, password });
    }
  }
};
</script>