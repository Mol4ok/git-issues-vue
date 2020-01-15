<template lang="pug">
  #app
    Header
    .container
      router-view
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>
