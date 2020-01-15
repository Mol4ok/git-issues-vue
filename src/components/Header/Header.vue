<template lang="pug">
  nav.header
    .nav-wrapper
      .brand-logo
        img(:src="logo")
      ul.right
        li
          span.header__user(v-if="authUserLogin")
            img(:src="avatarUrl" alt="")
            span {{authUserLogin}}
          router-link(v-else :to="{name: 'root'}") Авторизация
        li
          router-link(:to="{name: 'repos'}") Repos
</template>

<script>
import { mapGetters } from "vuex";
import logo from "@/assets/images/octocat.png";
export default {
  name: "Header",
  data: () => ({
    logo
  }),
  computed: {
    ...mapGetters(["auth"]),
    authUserLogin() {
      return this.auth.login;
    },
    avatarUrl() {
      return this.auth.avatar_url;
    }
  }
};
</script>