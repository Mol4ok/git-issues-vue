import Vue from "vue"
import Vuex from "vuex"
import gitApi from "@/utils/gitApi"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    user: {},
    repos: {},
    issues: {}
  },
  getters: {
    auth: state => state.auth,
    user: state => state.user,
    repos: state => state.repos,
    issues: state => state.issues
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth
    },

    setUser(state, user) {
      state.user = user
    },

    setRepos(state, { login, reposArr, page, reposPagesQuant = 1 }) {
      const repos = { ...state.repos }
      if (reposArr.length) {
        if (reposPagesQuant > 1) {
          repos[login] = {
            pages: new Array(reposPagesQuant).fill(null)
          }
        } else {
          repos[login] = repos[login] || {
            pages: []
          }
        }
        repos[login].pages[page] = reposArr
      } else {
        repos[login] = false
      }
      state.repos = repos
    },

    setIssues(state, { login, repo, issuesArr, page, issuesPagesQuant }) {
      const issues = { ...state.issues }
      if (issuesArr.length) {
        if (!issues[login] || !issues[login][repo]) {
          if (issues[login]) {
            issues[login][repo] = {
              pages: new Array(issuesPagesQuant).fill(null)
            }
          } else {
            issues[login] = {
              [repo]: {
                pages: new Array(issuesPagesQuant).fill(null)
              }
            }
          }
        }
        issues[login][repo].pages[page] = issuesArr
      } else {
        issues[login][repo] = false
      }
      state.issues = issues
    }
  },
  actions: {
    getAuth: async ({ commit }, { login, password }) => {
      const path = "user"
      const headers = new Headers({
        Authorization: `Basic ${btoa(`${login}:${password}`)}`
      })
      const { result: authData, code } = await gitApi({ path, headers })
      if (code === 200) {
        authData.password = password
        commit("setAuth", authData)
      }
    },

    getUser: async ({ commit, dispatch, state }, login) => {
      const path = `users/${login}`
      const { auth } = state
      if (state.user.login === login) {
        return false
      }
      const { result: user, code } = await gitApi({ path, auth })
      user.login = login
      if (code === 200) {
        commit("setUser", user)
        dispatch("getRepos", login)
      }
    },

    getRepos: async ({ commit, state }, login) => {
      const path = `users/${login}/repos`
      const { auth } = state
      if (state.repos[login]) {
        return false
      }
      const { result: reposArr, code, link } = await gitApi({ path, auth })
      if (code === 200) {
        let reposPagesQuant = link
          ? Number(link.match(/page=(\d*)>; rel="last"/)[1])
          : undefined
        commit("setRepos", { login, reposArr, page: 0, reposPagesQuant })
      }
    },

    getReposByPage: async ({ commit, state }, { login, page }) => {
      const path = `users/${login}/repos?page=${page + 1}`
      const { auth } = state
      if (state.repos[login].pages[page]) {
        return false
      }
      const { result: reposArr, code } = await gitApi({ path, auth })
      if (code === 200) {
        commit("setRepos", { login, reposArr, page })
      }
    },

    getIssues: async ({ commit, dispatch, state }, { repo, login }) => {
      const path = `repos/${login}/${repo}/issues`
      const params = {
        state: "open"
      }
      const { auth, issues } = state
      if (issues[login] && issues[login][repo]) {
        return false
      }
      const { result: issuesArr, code, link } = await gitApi({
        path,
        params,
        auth
      })
      if (code === 200) {
        let issuesPagesQuant = link
          ? Number(link.match(/page=(\d*)>; rel="last"/)[1])
          : undefined
        dispatch("getUser", login)
        commit("setIssues", {
          login,
          repo,
          issuesArr,
          page: 0,
          issuesPagesQuant
        })
      }
    },

    getIssuesByPage: async ({ commit, state }, { login, repo, page }) => {
      const path = `repos/${login}/${repo}/issues?page=${page + 1}`
      const { auth, issues } = state
      if (issues[login] && issues[login][repo].pages[page]) {
        return false
      }
      const { result: issuesArr, code } = await gitApi({ path, auth })
      if (code === 200) {
        commit("setIssues", { login, repo, issuesArr, page })
      }
    }
  }
})
