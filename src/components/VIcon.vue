<!-- eslint-disable prettier/prettier -->
<template>
  <svg :viewBox="viewBox">
    <!--
      MDN says that using xlink:href is not recommended, therefore used href
    -->
    <use :href="`#${href}`"></use>
  </svg>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      viewBox: {
        type: String,
        required: false,
        default: '0 0 1 1',
      },
      href: {
        type: String,
        required: true,
      },
    },
  });
</script>
