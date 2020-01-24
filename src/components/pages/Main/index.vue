<!-- eslint-disable prettier/prettier -->
<template>
  <TheContainer>
    <TheArticles />
  </TheContainer>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheContainer from '@/components/TheContainer';
  import TheArticles from '@/components/TheArticles';

  export default Vue.extend({
    components: {
      TheContainer,
      TheArticles,
    },
  });
</script>
