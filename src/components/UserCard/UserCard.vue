<template lang="pug">
  .user.col.s12
    .user__img
      img(:src="userData.avatar_url" alt="")
    .user__info
      .user__name {{userData.name}}
      .user__location {{userData.location}}
      a(:href="userData.html_url" target="_blank").user__link
        | Git page
</template>

<script>
export default {
  name: "UserCard",
  props: ["userData"]
};
</script>