<!-- eslint-disable prettier/prettier -->
<template>
  <TheContainer>
    <TheUser />
  </TheContainer>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheContainer from '@/components/TheContainer';
  import TheUser from './TheUser';

  export default Vue.extend({
    components: {
      TheContainer,
      TheUser,
    },
  });
</script>
