<template lang="pug">
  div
    h2 GitRepos
    .row
      .input-field.col.s6
        user-form
      .col.s6
        user-card(v-if="user.login" :userData="user")
    .row
      loader(v-if="reposLoader")
      repos(v-else-if="repos[login]", :repos="repos[login]" :login="login")
    

</template>

<script>
import { mapGetters } from "vuex";
import UserForm from "@/components/UserForm";
import UserCard from "@/components/UserCard";
import Repos from "@/components/Repos";
import Loader from "@/components/Loader";
export default {
  name: "GitRepos",
  components: {
    UserForm,
    UserCard,
    Repos,
    Loader
  },
  computed: {
    ...mapGetters(["user", "repos"]),
    login() {
      return this.user.login;
    },
    reposLoader() {
      const { login, repos } = this;
      return login && repos[login] === undefined ? true : false;
    }
  }
};
</script>