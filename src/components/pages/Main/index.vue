<!-- eslint-disable prettier/prettier -->
<template>
  <TheContainer>
    <RptCard
      v-for="num in 2"
      :key="num"
    />
  </TheContainer>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';
  import TheContainer from '@/components/TheContainer';
  import RptCard from '@/components/RptCard';

  export default Vue.extend({
    components: {
      TheContainer,
      RptCard,
    },
  });
</script>
