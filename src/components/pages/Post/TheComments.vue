<!-- eslint-disable prettier/prettier -->
<template>
  <div class="comments">
    <VCommentsChunk :children="children" />
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      children: {
        type: Array,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .comments {
    margin-bottom: -20px;
  }
</style>
