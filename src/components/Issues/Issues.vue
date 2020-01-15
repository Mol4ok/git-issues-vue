<template lang="pug">
div.issues
  page-buttons(
    v-if="pages > 1"
    :pages="pages"
    @changePage="changePage"
    :currentPage="page"
  )
  loader(v-if="!issuesPageArr")
  .issues__item(
    v-else
    v-for="issue in issuesPageArr"
    )
    .issues__user
      img(:src="issue.user.avatar_url" alt="")
      .issues__login {{issue.user.login}}
    p.issues__date {{issue.created_at}}
    vue-mark-down(:source="issue.body")
    a(:href="issue.html_url" target="_blank")
      | link to issue
</template>

<script>
import VueMarkDown from "vue-markdown"
import { mapGetters, mapActions } from "vuex"
import PageButtons from "@/components/PageButtons"
import Loader from "@/components/Loader"
export default {
  name: "Issues",
  props: ["repo", "login"],
  components: {
    PageButtons,
    Loader,
    VueMarkDown
  },
  data: () => ({
    page: 0
  }),
  computed: {
    ...mapGetters(["issues"]),
    pages() {
      const { issues, login, repo } = this
      return issues[login][repo].pages.length
    },
    issuesPageArr() {
      const { issues, login, repo, page } = this
      return issues[login][repo].pages[page]
    }
  },
  methods: {
    ...mapActions(["getIssuesByPage"]),
    changePage(page) {
      const { repo, login } = this
      this.getIssuesByPage({ repo, login, page })
      this.page = page
    }
  }
}
</script>
