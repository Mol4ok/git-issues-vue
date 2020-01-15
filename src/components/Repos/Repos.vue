<template lang="pug">
  div
    <h2>Repositories of {{login}}</h2>
    page-buttons(
      v-if="pages > 1"
      :pages="pages"
      :currentPage="page"
      @changePage="changePage"
    )
    ul.repos(v-if="reposPagesArr")
      li.repos__item(v-for="repo in reposPagesArr")
        template(v-if="repo.open_issues")
          router-link(:to="{name: 'issues', params: {login, repo: repo.name}}")
            span {{repo.name}}
          span {{repo.open_issues}} opened issues
        template(v-else)
          span {{repo.name}}
          span none
    loader(v-else)

</template>

<script>
import { mapActions, mapGetters } from "vuex"
import PageButtons from "@/components/PageButtons"
import Loader from "@/components/Loader"
export default {
  name: "Repos",
  props: ["login"],
  data: () => ({
    page: 0
  }),
  components: {
    PageButtons,
    Loader
  },
  computed: {
    ...mapGetters(["repos"]),
    pages() {
      return this.repos[this.login].pages.length
    },
    reposPagesArr() {
      const { login, repos, page } = this
      return repos[login].pages[page]
    }
  },
  methods: {
    ...mapActions(["getReposByPage"]),
    changePage(page) {
      const { login } = this
      this.getReposByPage({ login, page })
      this.page = page
    }
  }
}
</script>
