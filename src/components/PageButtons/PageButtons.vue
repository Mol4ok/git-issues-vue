<template lang="pug">
  .pages
    .pages__title
      | Pages
    button(
      v-for="(page, index) in pages"
      @click="changePage(index)"
      :class="{'active': index === currentPage}"
    )
      | {{page}}
</template>

<script>
export default {
  name: "PageButtons",
  props: ["pages", "currentPage"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    }
  }
};
</script>