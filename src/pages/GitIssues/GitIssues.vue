<template lang="pug">
  div
    h2 
      | Issues of 
      span "{{repo}}"
    loader(v-if="issuesLoader")
    issues(
      v-else-if="issues[login]"
      :login="login"
      :repo="repo"
    )
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Issues from "@/components/Issues";
import Loader from "@/components/Loader";
export default {
  name: "GitIssues",
  components: {
    Loader,
    Issues
  },
  data() {
    return {
      login: this.$route.params.login,
      repo: this.$route.params.repo
    };
  },
  mounted() {
    this.getIssues({ login: this.login, repo: this.repo });
  },
  computed: {
    ...mapGetters(["issues"]),
    issuesLoader() {
      const { issues, repo, login } = this;
      return !issues[login] || issues[login][repo] === undefined ? true : false;
    }
  },
  methods: {
    ...mapActions(["getIssues"])
  }
};
</script>