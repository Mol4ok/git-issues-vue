<template lang="pug">
div
  .progress(v-if="isLinear")
    .indeterminate
  .preloader-wrapper.big.active(v-if="isCircle")
    .spinner-layer.spinner-blue
      .circle-clipper.left
        .circle
      .gap-patch
        .circle
      .circle-clipper.right
        .circle
</template>

<script>
export default {
  name: "Loader",
  props: {
    type: {
      type: String,
      default: "linear"
    }
  },
  computed: {
    isLinear() {
      return this.type === "linear";
    },
    isCircle() {
      return this.type === "circle";
    }
  }
};
</script>