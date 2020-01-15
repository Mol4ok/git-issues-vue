import GitAutorize from "@/pages/GitAutorize"
import GitRepos from "@/pages/GitRepos"
import GitIssues from "@/pages/GitIssues"

export default [
  {
    path: "/",
    name: "root",
    component: GitAutorize
  },
  {
    path: "/repos",
    name: "repos",
    component: GitRepos
  },
  {
    path: "/issues/:login/:repo",
    name: "issues",
    component: GitIssues
  }
]
