<!-- eslint-disable prettier/prettier -->
<template>
  <TheContainer>
    <TheWall />
  </TheContainer>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheContainer from '@/components/TheContainer';
  import TheWall from './TheWall';

  export default Vue.extend({
    components: {
      TheContainer,
      TheWall,
    },
  });
</script>
