<!-- eslint-disable prettier/prettier -->
<template>
  <TheContainer>
    <ThePost />
  </TheContainer>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheContainer from '@/components/TheContainer';
  import ThePost from './ThePost';

  export default Vue.extend({
    components: {
      TheContainer,
      ThePost,
    },
  });
</script>
